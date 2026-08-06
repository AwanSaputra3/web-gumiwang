<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BeritaController extends Controller
{
    public function index(Request $request)
    {
        $query = Berita::query();
        
        if ($request->has('kategori')) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->has('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }
        
        $data = $query->orderBy('id', 'desc')->get();
        
        // Decode JSON fields if needed, but Eloquent will do it if we cast. 
        // For simplicity we just return.
        
        return response()->json([
            'success' => true,
            'count' => $data->count(),
            'data' => $data
        ]);
    }

    public function show($id)
    {
        $item = Berita::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        if (!isset($data['kategori'])) {
            $data['kategori'] = 'Umum';
        }
        if (empty($data['slug']) && !empty($data['nama'])) {
            $data['slug'] = Str::slug($data['nama']);
        }
        if (empty($data['slug']) && !empty($data['judul'])) {
            $data['slug'] = Str::slug($data['judul']);
        }

        // Convert array to json string for db if not casted in model
        foreach (['fasilitas', 'sejarah', 'demografi', 'kontak', 'visiMisi'] as $field) {
            if (isset($data[$field]) && is_array($data[$field])) {
                $data[$field] = json_encode($data[$field]);
            }
        }
        
        $item = Berita::create($data);
        return response()->json(['success' => true, 'data' => $item], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Berita::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        
        $data = $request->all();
        
        if (empty($data['slug']) && !empty($data['nama'])) {
            $data['slug'] = Str::slug($data['nama']);
        }
        if (empty($data['slug']) && !empty($data['judul'])) {
            $data['slug'] = Str::slug($data['judul']);
        }
        
        // Convert array to json string for db
        foreach (['fasilitas', 'sejarah', 'demografi', 'kontak', 'visiMisi'] as $field) {
            if (isset($data[$field]) && is_array($data[$field])) {
                $data[$field] = json_encode($data[$field]);
            }
        }

        $item->update($data);
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = Berita::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        $item->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}