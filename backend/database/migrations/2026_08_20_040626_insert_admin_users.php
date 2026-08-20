<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'admin1',
                'email' => 'admin1@gumiwang.com',
                'password' => Hash::make('DesaWisataGumiwang123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'admin2',
                'email' => 'admin2@gumiwang.com',
                'password' => Hash::make('DesaWisataGumiwang456'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('users')->whereIn('email', ['admin1@gumiwang.com', 'admin2@gumiwang.com'])->delete();
    }
};
