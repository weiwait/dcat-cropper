<?php

namespace Weiwait\DcatCropper\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CroppingController extends Controller
{
    public function cropping(Request $request)
    {
        $request->validate([
            'file' => 'required|image',
        ]);

        $filename = Storage::disk(config('admin.upload.disk'))
            ->putFile('weiwait/cropper', $request->file('file'));

        return response()->json([
            'name' => $filename,
            'url' => Storage::disk(config('admin.upload.disk'))->url($filename),
        ]);
    }
}
