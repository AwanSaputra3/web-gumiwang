<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('komoditas', function (Blueprint $table) {
            $table->unsignedBigInteger('umkm_id')->nullable()->after('id');
            $table->foreign('umkm_id')->references('id')->on('umkms')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('komoditas', function (Blueprint $table) {
            $table->dropForeign(['umkm_id']);
            $table->dropColumn('umkm_id');
        });
    }
};
