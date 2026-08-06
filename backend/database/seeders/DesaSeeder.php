<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Desa;

class DesaSeeder extends Seeder
{
    public function run(): void
    {
        Desa::truncate();
        $json = file_get_contents(base_path('../backend_old/data/desa.json'));
        $data = json_decode($json, true);

        $desa = new Desa();
        $desa->nama = $data['nama'] ?? null;
        $desa->kecamatan = $data['kecamatan'] ?? null;
        $desa->kabupaten = $data['kabupaten'] ?? null;
        $desa->provinsi = $data['provinsi'] ?? null;
        $desa->kodePos = $data['kodePos'] ?? null;
        $desa->alamatLengkap = $data['alamatLengkap'] ?? null;
        $desa->deskripsi = $data['deskripsi'] ?? null;
        $desa->sejarah = $data['sejarah'] ?? null;
        $desa->demografi = $data['demografi'] ?? null;
        $desa->kontak = $data['kontak'] ?? null;
        $desa->visiMisi = $data['visiMisi'] ?? null;
        $desa->save();
    }
}
