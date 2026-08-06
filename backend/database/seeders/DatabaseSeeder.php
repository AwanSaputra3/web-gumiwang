<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Berita;
use App\Models\Desa;
use App\Models\Galeri;
use App\Models\Komoditas;
use App\Models\Wisata;
use App\Models\Setting;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'awandhoni@gmail.com',
        ]);

        // Seed Settings for Home, Peta, Kontak
        Setting::create([
            'key' => 'home_hero_title',
            'value' => json_encode('Selamat Datang di Gumiwang Tourism')
        ]);
        Setting::create([
            'key' => 'home_hero_subtitle',
            'value' => json_encode('Jelajahi keindahan alam dan budaya desa kami')
        ]);
    }
}
