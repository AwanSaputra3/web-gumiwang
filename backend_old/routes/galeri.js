import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data
const galeriData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'galeri.json'), 'utf-8')
);

// GET /api/galeri
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: galeriData.length,
    data: galeriData,
  });
});

export default router;
