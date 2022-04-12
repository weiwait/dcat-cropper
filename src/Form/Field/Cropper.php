<?php

namespace Weiwait\DcatCropper\Form\Field;

use Dcat\Admin\Form\Field\Image;
use Illuminate\Support\Str;

class Cropper extends Image
{
    protected $view = 'weiwait.dcat-cropper::index';

    protected function prepareInputValue($file)
    {
        if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
            $ext = $result[2];

            $image = base64_decode(explode(',', $file)[1]);

            $file = config('admin.upload.directory.image') . '/' . md5(Str::uuid()) . '.' . $ext;

            $this->getStorage()->put($file, $image);

            $this->callInterventionMethods($this->getStorage()->path($file), '');
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
}
