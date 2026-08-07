import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import './DaftarUmkm.css';

function DaftarUmkm() {
  const [umkms, setUmkms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('semua');

  useEffect(() => {
    async function fetchUmkms() {
      try {
        const res = await fetch('/api/umkm');
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setUmkms(data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching UMKM:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUmkms();
  }, []);

  return (
    <div className="page-umkm">
      <HeroSection
        compact
        subtitle="Potensi Lokal"
        title="Daftar Komoditas"
        description="Kenali lebih dekat para pelaku usaha, kelompok tani, peternak, dan UMKM di Desa Gumiwang."
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : umkms.length === 0 ? (
            <div className="empty-state text-center" style={{ padding: '4rem 0' }}>
              <span style={{ fontSize: '3rem' }}>🏬</span>
              <h3>Belum Ada Komoditas Terdaftar</h3>
              <p>Saat ini belum ada data komoditas atau UMKM yang didaftarkan.</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              <div className="filter-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
                {['semua', 'pertanian', 'perikanan', 'umkm'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`btn ${activeFilter === cat ? 'btn-primary' : 'btn-outline'}`}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="umkm-grid">
                {umkms
                  .map(umkm => {
                    // Extract unique categories from komoditas
                    const categories = [...new Set((umkm.komoditas || []).map(k => k.kategori.toLowerCase()))];
                    return { ...umkm, categories };
                  })
                  .filter(umkm => activeFilter === 'semua' || umkm.categories.includes(activeFilter))
                  .map((umkm, idx) => (
                <Link to={`/umkm/${umkm.id}`} key={umkm.id} className={`umkm-card glass-card fade-in fade-in-delay-${idx % 3}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="umkm-card__header">
                    <div 
                      className="umkm-card__logo" 
                      style={{ 
                        backgroundImage: `url(${umkm.logo || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=400&q=80'})` 
                      }}
                    ></div>
                  </div>
                  <div className="umkm-card__body">
                    <h3>{umkm.nama}</h3>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      {umkm.categories.map(c => (
                        <span key={c} style={{ fontSize: '0.75rem', padding: '2px 8px', background: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderRadius: '12px', textTransform: 'capitalize' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                    <p className="umkm-card__desc">{umkm.deskripsi || 'Tidak ada deskripsi tersedia.'}</p>
                    <div className="umkm-card__footer">
                      <span className="umkm-card__product-count">
                        📦 {umkm.komoditas ? umkm.komoditas.length : 0} Produk
                      </span>
                      <span className="btn-link">Lihat Toko →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default DaftarUmkm;
