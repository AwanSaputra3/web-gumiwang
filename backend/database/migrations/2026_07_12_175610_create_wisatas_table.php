<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('wisatas', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('slug')->unique();
            $table->string('kategori');
            $table->text('deskripsiSingkat');
            $table->text('deskripsiLengkap');
            $table->integer('harga')->nullable();
            $table->string('hargaFormatted')->nullable();
            $table->string('satuanHarga')->nullable();
            $table->json('fasilitas')->nullable();
            $table->string('jamOperasional')->nullable();
            $table->decimal('rating', 2, 1)->nullable();
            $table->boolean('featured')->default(false);
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('wisatas');
    }
};
