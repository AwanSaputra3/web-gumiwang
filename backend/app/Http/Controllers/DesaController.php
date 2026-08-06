<?php

namespace App\Http\Controllers;

use App\Models\Desa;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class DesaController extends Controller
{
    public function index(Request $request)
    {
        $query = Desa::query();
        
        if ($request->has('kategori')) {
            $query->where('kategori', $request->kategori);
        }
        if ($request->has('featured')) {
            $query->where('featured', $request->boolean('featured'));
        }
        
        $data = $query->orderBy('id', 'desc')->get();
        
        $data->transform(function ($item) {
            $item->visi = $item->visiMisi['visi'] ?? '';
            $item->misi = $item->visiMisi['misi'] ?? [];
            return $item;
        });
        
        return response()->json([
            'success' => true,
            'count' => $data->count(),
            'data' => $data
        ]);
    }

    public function show($id)
    {
        $item = Desa::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        
        $item->visi = $item->visiMisi['visi'] ?? '';
        $item->misi = $item->visiMisi['misi'] ?? [];
        
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        
        if (empty($data['slug']) && !empty($data['nama'])) {
            $data['slug'] = Str::slug($data['nama']);
        }
        if (empty($data['slug']) && !empty($data['judul'])) {
            $data['slug'] = Str::slug($data['judul']);
        }

        if (isset($data['visi']) || isset($data['misi'])) {
            $data['visiMisi'] = [
                'visi' => $data['visi'] ?? '',
                'misi' => $data['misi'] ?? []
            ];
            unset($data['visi']);
            unset($data['misi']);
        }
        
        $item = Desa::create($data);
        return response()->json(['success' => true, 'data' => $item], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Desa::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        
        $data = $request->all();
        
        if (empty($data['slug']) && !empty($data['nama'])) {
            $data['slug'] = Str::slug($data['nama']);
        }
        if (empty($data['slug']) && !empty($data['judul'])) {
            $data['slug'] = Str::slug($data['judul']);
        }
        
        if (isset($data['visi']) || isset($data['misi'])) {
            $data['visiMisi'] = [
                'visi' => $data['visi'] ?? '',
                'misi' => $data['misi'] ?? []
            ];
            unset($data['visi']);
            unset($data['misi']);
        }

        $item->update($data);
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = Desa::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        $item->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}