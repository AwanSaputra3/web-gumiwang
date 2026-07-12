import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data
const beritaData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'berita.json'), 'utf-8')
);

// GET /api/berita
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: beritaData.length,
    data: beritaData,
  });
});

// GET /api/berita/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const berita = beritaData.find((item) => item.id === id);

  if (!berita) {
    return res.status(404).json({
      success: false,
      message: 'Berita tidak ditemukan',
    });
  }

  res.json({
    success: true,
    data: berita,
  });
});

export default router;
