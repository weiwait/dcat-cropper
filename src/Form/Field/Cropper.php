<?php

namespace Weiwait\DcatCropper\Form\Field;

use Dcat\Admin\Form\Field\Image;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Cropper extends Image
{
    protected $view = 'weiwait.dcat-cropper::index';

    public function __construct($column, $arguments = [])
    {
        parent::__construct($column, $arguments);

        $this->mergeOptions(['croppingUrl' => route('dcat.admin.cropper.cropping')]);
    }

    protected function prepareInputValue($file)
    {
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
            $ext = $result[2];

            $image = base64_decode(explode(',', $file)[1]);

            $file = config('admin.upload.directory.image') . '/' . md5(Str::uuid()) . '.' . $ext;

            $this->getStorage()->put($file, $image);

            $this->callInterventionMethods($this->getStorage()->path($file), '');
        } elseif (str_starts_with($file, 'weiwait/cropper')) {
            $storage = Storage::disk(config('admin.upload.disk'));
            $cached = $storage->get($file);

            $file = config('admin.upload.directory.image') . '/' . basename($file);

            $this->getStorage()->put($file, $cached);

            $this->callInterventionMethods($this->getStorage()->path($file), '');

            foreach ($storage->files('weiwait/cropper') as $item) {
                if ($storage->lastModified($item) < time() - 3600 * 24) {
                    $storage->delete($item);
                }
            }
        }

        $this->destroyIfChanged($file);

        return $file;
    }

    /**
     * @param float|array $ratio
     * @return Cropper
     */
    public function ratio($ratio): Cropper
    {
        if (empty($ratio)) return $this;

        if (is_numeric($ratio)) {
            return parent::ratio($ratio);
        }

        if (is_array($ratio)) {
            $this->mergeOptions(['dimensions' => ['ratio' => $ratio]]);
        }

        return $this;
    }

    /**
     * @param int | array $width
     * @param null $height
     * @return $this
     */
    public function resolution($width, $height = null): Cropper
    {
        if (!is_array($width)) {
            $width = [
                'default' => [$width, $height ?: $width]
            ];
        }

        $this->mergeOptions(['resolution' => $width]);

        return $this;
    }

    /**
     * @throws \Exception
     */
    public function jpeg(float $quality = 1): Cropper
    {
        if ($quality > 1 || $quality < 0) {
            throw new \Exception('图片质量区间[0~1]');
        }

        $this->mergeOptions(['quality' => $quality]);

        return $this;
    }

    public function useBase64($base64 = true): Cropper
    {
        $this->mergeOptions(['useBase64' => $base64]);

        return $this;
    }
}
