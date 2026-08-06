<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|image|max:5120', // Max 5MB (5120 KB)
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()->first()
            ], 422);
        }

        $file = $request->file('file');
        $path = $file->store('uploads', 'public');
        
        // Return just the relative path for the frontend so proxy works correctly
        $url = '/storage/' . $path;

        return response()->json([
            'success' => true,
            'url' => $url
        ]);
    }
}
