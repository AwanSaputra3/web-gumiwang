<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BeritaController;
use App\Http\Controllers\DesaController;
use App\Http\Controllers\KomoditasController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UmkmController;
use App\Http\Controllers\WisataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);

// Public Routes
Route::get('/desa', [DesaController::class, 'index']);
Route::get('/umkm', [UmkmController::class, 'index']);
Route::get('/umkm/{id}', [UmkmController::class, 'show']);
Route::get('/komoditas', [KomoditasController::class, 'index']);
Route::get('/komoditas/{id}', [KomoditasController::class, 'show']);
Route::get('/wisata', [WisataController::class, 'index']);
Route::get('/wisata/featured', function (Illuminate\Http\Request $request) {
    $request->merge(['featured' => true]);
    return app(WisataController::class)->index($request);
});
Route::get('/wisata/{id}', [WisataController::class, 'show']);
Route::get('/berita', [BeritaController::class, 'index']);
Route::get('/berita/{id}', [BeritaController::class, 'show']);
Route::get('/settings', [SettingController::class, 'index']);

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // Admin CRUD routes
    Route::post('admin/upload', [\App\Http\Controllers\UploadController::class, 'upload']);
    Route::apiResource('admin/berita', BeritaController::class);
    Route::apiResource('admin/wisata', WisataController::class);
    Route::apiResource('admin/komoditas', KomoditasController::class);
    Route::apiResource('admin/umkm', UmkmController::class);
    Route::apiResource('admin/desa', DesaController::class);
    Route::apiResource('admin/settings', SettingController::class);
});
