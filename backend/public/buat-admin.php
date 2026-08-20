<?php
require __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Http\Kernel::class)->handle(
    Illuminate\Http\Request::capture()
);

use App\Models\User;
use Illuminate\Support\Facades\Hash;

try {
    User::updateOrCreate(
        ['email' => 'admin1@gumiwang.com'],
        ['name' => 'admin1', 'password' => Hash::make('DesaWisataGumiwang123')]
    );
    User::updateOrCreate(
        ['email' => 'admin2@gumiwang.com'],
        ['name' => 'admin2', 'password' => Hash::make('DesaWisataGumiwang456')]
    );
    echo '<h1 style="color: green;">Sukses!</h1><p>Akun admin1 dan admin2 berhasil dibuat/diperbarui dengan password yang benar.</p>';
} catch (\Exception $e) {
    echo '<h1 style="color: red;">Gagal:</h1><p>' . $e->getMessage() . '</p>';
}
