# 🌿 Website Desa Wisata Branjang

Platform digital untuk promosi, informasi, dan eksplorasi wisata Desa Branjang, Ungaran Barat, Kabupaten Semarang, Jawa Tengah.

## 📁 Struktur Proyek

```
gumiwang-tourism/
├── frontend/    ← Vite + React (UI)
├── backend/     ← Express.js (REST API)
└── README.md
```

## 🚀 Cara Menjalankan

### 1. Backend (API Server)

```bash
cd backend
npm install
npm run dev
```

Backend berjalan di `http://localhost:3001`

### 2. Frontend (UI)

```bash
cd frontend
npm install
npm run dev
```

Frontend berjalan di `http://localhost:5173`

> **Catatan:** Jalankan backend terlebih dahulu agar frontend bisa mengambil data dari API.

## 📡 API Endpoints

| Method | Endpoint              | Deskripsi                           |
|--------|----------------------|-------------------------------------|
| GET    | `/api/wisata`         | Daftar semua wisata                 |
| GET    | `/api/wisata?kategori=alam` | Filter wisata by kategori     |
| GET    | `/api/wisata/featured`| Wisata unggulan                     |
| GET    | `/api/wisata/:id`     | Detail wisata                       |
| GET    | `/api/produk`         | Daftar semua produk UMKM            |
| GET    | `/api/produk?kategori=makanan` | Filter produk by kategori |
| GET    | `/api/desa`           | Profil desa                         |
| GET    | `/api/health`         | Health check                        |

## 🌐 Halaman Website

- **Beranda** — Highlight wisata, stats, dan produk unggulan
- **Wisata** — Daftar & filter paket wisata (alam, budaya, edukasi)
- **Detail Wisata** — Info lengkap, galeri, fasilitas, harga
- **Produk UMKM** — Katalog produk lokal (makanan, kerajinan, oleh-oleh)
- **Tentang Desa** — Profil, sejarah, potensi, visi-misi
- **Kontak** — Info kontak & media sosial

## 🛠️ Tech Stack

- **Frontend:** React 19, React Router 7, Vite 6, Vanilla CSS
- **Backend:** Node.js, Express 4, CORS
- **Data:** JSON statis (tanpa database server)
