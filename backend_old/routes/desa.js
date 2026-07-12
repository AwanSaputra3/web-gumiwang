import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

// Load data
const desaData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'desa.json'), 'utf-8')
);

// GET /api/desa — Profil desa
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: desaData,
  });
});

export default router;
