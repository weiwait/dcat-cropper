<?php

namespace Weiwait\DcatCropper;

use Dcat\Admin\Extend\ServiceProvider;
use Dcat\Admin\Form;
use Weiwait\DcatCropper\Form\Field\Cropper;

class DcatCropperServiceProvider extends ServiceProvider
{
	protected $js = [
        'js/cropper.min.v1.5.12.js',
    ];
	protected $css = [
		'css/cropper.min.v1.5.12.css',
	];

	public function register()
	{
		//
	}

	public function init()
	{
		parent::init();

		Form::extend('cropper', Cropper::class);

		$this->publishable();

	}

	public function settingForm()
	{
		return new Setting($this);
	}
}
