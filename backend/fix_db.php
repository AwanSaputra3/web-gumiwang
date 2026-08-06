<?php 
require __DIR__.'/vendor/autoload.php'; 
$app = require_once __DIR__.'/bootstrap/app.php'; 
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class); 
$kernel->bootstrap(); 
App\Models\Berita::where('image', 'LIKE', 'http://localhost%')->get()->each(function($b) { 
  $b->image = str_replace('http://localhost', '', $b->image); 
  $b->save(); 
});
App\Models\Wisata::where('image', 'LIKE', 'http://localhost%')->get()->each(function($b) { 
  $b->image = str_replace('http://localhost', '', $b->image); 
  $b->save(); 
});
App\Models\Komoditas::where('image', 'LIKE', 'http://localhost%')->get()->each(function($b) { 
  $b->image = str_replace('http://localhost', '', $b->image); 
  $b->save(); 
});
