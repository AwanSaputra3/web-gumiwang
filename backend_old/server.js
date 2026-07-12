import express from 'express';
import cors from 'cors';
import desaRoutes from './routes/desa.js';
import komoditasRoutes from './routes/komoditas.js';
import wisataRoutes from './routes/wisata.js';
import galeriRoutes from './routes/galeri.js';
import beritaRoutes from './routes/berita.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/desa', desaRoutes);
app.use('/api/komoditas', komoditasRoutes);
app.use('/api/wisata', wisataRoutes);
app.use('/api/galeri', galeriRoutes);
app.use('/api/berita', beritaRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API Desa Gumiwang berjalan' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan',
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server berjalan di http://0.0.0.0:${PORT}`);
  console.log(`📡 API tersedia di http://0.0.0.0:${PORT}/api`);
});
