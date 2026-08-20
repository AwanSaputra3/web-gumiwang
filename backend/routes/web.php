<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/buat-cors', function () {
    Artisan::call('config:publish', ['name' => 'cors']);
    return 'File cors.php berhasil diterbitkan!';
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/buat-storage-link', function () {
    Artisan::call('storage:link');
    return 'Proses storage:link berhasil dieksekusi!';
});

Route::get('/jalankan-migrasi', function () {
    try {
        Artisan::call('migrate', ['--force' => true]);
        return 'Migrasi berhasil dieksekusi! Akun admin baru telah ditambahkan ke database.';
    } catch (\Exception $e) {
        return 'Gagal melakukan migrasi: ' . $e->getMessage();
    }
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
