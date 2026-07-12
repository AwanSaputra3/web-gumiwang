import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data
const wisataData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'wisata.json'), 'utf-8')
);

// GET /api/wisata — Daftar semua wisata (opsional filter ?kategori=)
router.get('/', (req, res) => {
  const { kategori } = req.query;

  let result = wisataData;

  if (kategori) {
    result = wisataData.filter(
      (item) => item.kategori.toLowerCase() === kategori.toLowerCase()
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

// GET /api/wisata/featured — Wisata unggulan
router.get('/featured', (req, res) => {
  const featured = wisataData.filter((item) => item.featured);

  res.json({
    success: true,
    count: featured.length,
    data: featured,
  });
});

// GET /api/wisata/:id — Detail wisata by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const wisata = wisataData.find((item) => item.id === id);

  if (!wisata) {
    return res.status(404).json({
      success: false,
      message: 'Wisata tidak ditemukan',
    });
  }

  res.json({
    success: true,
    data: wisata,
  });
});

export default router;
