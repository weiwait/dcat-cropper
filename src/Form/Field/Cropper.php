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
        }

        $this->destroyIfChanged($file);

        $this->callInterventionMethods($this->getStorage()->path($file), $this->getStorage()->mimeType($file));

        return $file;
    }
}
