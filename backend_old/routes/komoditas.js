import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data
const komoditasData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'komoditas.json'), 'utf-8')
);

// GET /api/komoditas — Daftar semua komoditas (opsional filter ?kategori=)
router.get('/', (req, res) => {
  const { kategori } = req.query;

  let result = komoditasData;

  if (kategori) {
    result = komoditasData.filter(
      (item) => item.kategori.toLowerCase() === kategori.toLowerCase()
    );
  }

  res.json({
    success: true,
    count: result.length,
    data: result,
  });
});

export default router;
