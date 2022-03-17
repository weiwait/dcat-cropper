<?php

namespace Weiwait\DcatCropper\Form\Field;

use Dcat\Admin\Form\Field\MultipleImage;
use Illuminate\Support\Str;

class MultipleCropper extends MultipleImage
{
    protected $view = 'weiwait.dcat-cropper::multiple-cropper';

    protected function prepareInputValue($file)
    {
        $files = $file;
        foreach ($files as &$file) {
            if (preg_match('/^(data:\s*image\/(\w+);base64,)/', $file, $result)){
                $ext = $result[2];

                $image = base64_decode(explode(',', $file)[1]);

                $file = config('admin.upload.directory.image') . '/' . md5(Str::uuid()) . '.' . $ext;

                $this->getStorage()->put($file, $image);

                $this->callInterventionMethods($this->getStorage()->path($file), $this->getStorage()->mimeType($file));
            }
        }

        $this->destroyIfChanged($files);

        return $files;
    }

    /**
     * @param float|array $ratio
     * @return MultipleCropper
     */
    public function ratio($ratio): MultipleCropper
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
    public function resolution($width, $height = null): MultipleCropper
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
