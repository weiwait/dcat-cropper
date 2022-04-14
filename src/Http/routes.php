<?php

use Weiwait\DcatCropper\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::post('cropper/cropping', [Controllers\CroppingController::class, 'cropping'])
    ->name('cropper.cropping');
