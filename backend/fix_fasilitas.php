<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\Wisata;

$wisatas = Wisata::all();
foreach ($wisatas as $w) {
    $fas = $w->getRawOriginal('fasilitas');
    if ($fas === null) continue;
    
    // Decode until it's an array of simple strings or a normal string
    while (is_string($fas) && str_starts_with($fas, '[')) {
        $decoded = json_decode($fas, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            break;
        }
        if (is_array($decoded) && count($decoded) === 1 && is_string($decoded[0]) && str_starts_with($decoded[0], '[')) {
            $fas = $decoded[0]; // Peel one layer
        } else {
            $fas = $decoded;
            break;
        }
    }
    
    // If it's still a string (like a comma separated list), convert to array
    if (is_string($fas)) {
        // Remove brackets if any
        $fas = str_replace(['[', ']', '"'], '', $fas);
        $fas = array_map('trim', explode(',', $fas));
    }
    
    if (is_array($fas)) {
        // Flatten if nested
        $flattened = [];
        array_walk_recursive($fas, function($a) use (&$flattened) { $flattened[] = $a; });
        
        // Final cleanup of strings inside array
        $clean = [];
        foreach ($flattened as $f) {
            $f = str_replace(['[', ']', '\\', '"'], '', $f);
            if (!empty(trim($f))) {
                $clean[] = trim($f);
            }
        }
        $w->fasilitas = $clean;
        $w->save();
        echo "Fixed ID {$w->id}\n";
    }
}
echo "Done.\n";
