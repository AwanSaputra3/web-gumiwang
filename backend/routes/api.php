<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

use App\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Helper function to read JSON from storage/app/json_data
function getJsonData($filename) {
    $path = storage_path('app/json_data/' . $filename . '.json');
    if (!File::exists($path)) {
        return [];
    }
    return json_decode(File::get($path), true);
}

Route::get('/desa', function () {
    return response()->json([
        'success' => true,
        'data' => getJsonData('desa')
    ]);
});

Route::get('/komoditas', function () {
    return response()->json([
        'success' => true,
        'data' => getJsonData('komoditas')
    ]);
});

Route::get('/wisata', function (Request $request) {
    $wisata = collect(getJsonData('wisata'));
    
    if ($request->has('kategori')) {
        $wisata = $wisata->filter(function ($item) use ($request) {
            return strtolower($item['kategori'] ?? '') === strtolower($request->kategori);
        });
    }

    return response()->json([
        'success' => true,
        'count' => $wisata->count(),
        'data' => $wisata->values()
    ]);
});

Route::get('/wisata/featured', function () {
    $wisata = collect(getJsonData('wisata'))->filter(function ($item) {
        return isset($item['featured']) && $item['featured'] === true;
    });

    return response()->json([
        'success' => true,
        'count' => $wisata->count(),
        'data' => $wisata->values()
    ]);
});

Route::get('/wisata/{id}', function ($id) {
    if (!is_numeric($id)) return response()->json(['success' => false], 404);
    
    $wisata = collect(getJsonData('wisata'))->firstWhere('id', (int) $id);
    
    if (!$wisata) {
        return response()->json(['success' => false, 'message' => 'Wisata tidak ditemukan'], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $wisata
    ]);
});

Route::get('/galeri', function () {
    return response()->json([
        'success' => true,
        'data' => getJsonData('galeri')
    ]);
});

Route::get('/berita', function () {
    return response()->json([
        'success' => true,
        'data' => getJsonData('berita')
    ]);
});
