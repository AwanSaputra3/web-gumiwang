<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Umkm;

class UmkmController extends Controller
{
    public function index()
    {
        $data = Umkm::with('komoditas')->get();
        return response()->json(['success' => true, 'data' => $data]);
    }

    public function show($id)
    {
        $item = Umkm::with('komoditas')->find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function store(Request $request)
    {
        $item = Umkm::create($request->all());
        return response()->json(['success' => true, 'data' => $item], 201);
    }

    public function update(Request $request, $id)
    {
        $item = Umkm::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        $item->update($request->all());
        return response()->json(['success' => true, 'data' => $item]);
    }

    public function destroy($id)
    {
        $item = Umkm::find($id);
        if (!$item) return response()->json(['success' => false, 'message' => 'Not found'], 404);
        $item->delete();
        return response()->json(['success' => true, 'message' => 'Deleted']);
    }
}
