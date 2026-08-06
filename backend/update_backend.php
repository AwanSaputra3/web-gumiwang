<?php

$models = ['Berita', 'Desa', 'Galeri', 'Komoditas', 'Setting', 'Wisata'];

foreach ($models as $model) {
    $content = <<<PHP
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class {$model} extends Model
{
    use HasFactory;
    
    protected \$guarded = [];
}
PHP;
    file_put_contents("app/Models/{$model}.php", $content);
}

// Generate Controllers
$controllers = [
    'Berita' => 'Berita',
    'Desa' => 'Desa',
    'Galeri' => 'Galeri',
    'Komoditas' => 'Komoditas',
    'Setting' => 'Setting',
    'Wisata' => 'Wisata'
];

foreach ($controllers as $modelName => $controllerName) {
    $content = <<<PHP
<?php

namespace App\Http\Controllers;

use App\Models\\{$modelName};
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class {$controllerName}Controller extends Controller
{
    public function index(Request \$request)
    {
        \$query = {$modelName}::query();
        
        if (\$request->has('kategori')) {
            \$query->where('kategori', \$request->kategori);
        }
        if (\$request->has('featured')) {
            \$query->where('featured', \$request->boolean('featured'));
        }
        
        \$data = \$query->orderBy('id', 'desc')->get();
        
        // Decode JSON fields if needed, but Eloquent will do it if we cast. 
        // For simplicity we just return.
        
        return response()->json([
            'success' => true,
            'count' => \$data->count(),
            'data' => \$data
        ]);
    }

    public function show(\$id)
    {
        \$item = {$modelName}::find(\$id);
        if (!\$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        return response()->json(['success' => true, 'data' => \$item]);
    }

    public function store(Request \$request)
    {
        \$data = \$request->all();
        
        if (empty(\$data['slug']) && !empty(\$data['nama'])) {
            \$data['slug'] = Str::slug(\$data['nama']);
        }
        if (empty(\$data['slug']) && !empty(\$data['judul'])) {
            \$data['slug'] = Str::slug(\$data['judul']);
        }

        // Convert array to json string for db if not casted in model
        foreach (['fasilitas', 'sejarah', 'demografi', 'kontak', 'visiMisi'] as \$field) {
            if (isset(\$data[\$field]) && is_array(\$data[\$field])) {
                \$data[\$field] = json_encode(\$data[\$field]);
            }
        }
        
        \$item = {$modelName}::create(\$data);
        return response()->json(['success' => true, 'data' => \$item], 201);
    }

    public function update(Request \$request, \$id)
    {
        \$item = {$modelName}::find(\$id);
        if (!\$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        
        \$data = \$request->all();
        
        if (empty(\$data['slug']) && !empty(\$data['nama'])) {
            \$data['slug'] = Str::slug(\$data['nama']);
        }
        if (empty(\$data['slug']) && !empty(\$data['judul'])) {
            \$data['slug'] = Str::slug(\$data['judul']);
        }
        
        // Convert array to json string for db
        foreach (['fasilitas', 'sejarah', 'demografi', 'kontak', 'visiMisi'] as \$field) {
            if (isset(\$data[\$field]) && is_array(\$data[\$field])) {
                \$data[\$field] = json_encode(\$data[\$field]);
            }
        }

        \$item->update(\$data);
        return response()->json(['success' => true, 'data' => \$item]);
    }

    public function destroy(\$id)
    {
        \$item = {$modelName}::find(\$id);
        if (!\$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        \$item->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
PHP;
    file_put_contents("app/Http/Controllers/{$controllerName}Controller.php", $content);
}

echo "Models and Controllers updated successfully.";
