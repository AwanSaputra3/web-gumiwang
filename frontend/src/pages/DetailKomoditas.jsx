import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailWisata.css'; // Reuse Wisata CSS for similar layout

function DetailKomoditas() {
  const { id } = useParams();
  const [komoditas, setKomoditas] = useState(null);
  const [loading, setLoading] = useState(true);

  const kategoriEmoji = {
    pertanian: '🌾',
    perikanan: '🐟',
    umkm: '📦',
  };

  const kategoriGradient = {
    pertanian: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #34d399 100%)',
    perikanan: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 50%, #60a5fa 100%)',
    umkm: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
  };

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/komoditas/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setKomoditas(data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching detail komoditas:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="loading-container" style={{ minHeight: '80vh' }}>
          <div className="loading-spinner"></div>
          <span className="loading-text">Memuat detail komoditas...</span>
        </div>
      </div>
    );
  }

  if (!komoditas) {
    return (
      <div className="detail-page">
        <div className="detail-notfound">
          <span className="detail-notfound__icon">😕</span>
          <h2>Komoditas Tidak Ditemukan</h2>
          <p>Produk yang Anda cari tidak tersedia.</p>
          <Link to="/komoditas" className="btn btn-primary">
            ← Kembali ke Daftar Komoditas
          </Link>
        </div>
      </div>
    );
  }

  const emoji = kategoriEmoji[komoditas.kategori?.toLowerCase()] || '🛍️';
  const bgGradient = kategoriGradient[komoditas.kategori?.toLowerCase()] || 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)';

  const defaultImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80';
  const displayImage = komoditas.image || defaultImage;

  return (
    <div className="detail-page">
      {/* Hero Banner */}
      <section className="detail-hero" style={{ backgroundImage: `url(${displayImage})` }}>
        <div className="detail-hero__overlay"></div>
        <div className="container detail-hero__container">
          <Link to="/komoditas" className="detail-back-link">
            ← Kembali ke Daftar Komoditas
          </Link>
          <div className="detail-hero__badges">
            <span className="detail-badge detail-badge--category" style={{ background: bgGradient }}>
              {emoji} {komoditas.kategori?.toUpperCase()}
            </span>
          </div>
          <h1 className="detail-hero__title">{komoditas.nama}</h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container detail-layout">
          {/* Main Info */}
          <div className="detail-main">
            <div className="detail-gallery">
              <div className="detail-gallery__thumbs">
                 <img src={displayImage} alt={komoditas.nama} style={{width: '100%', borderRadius: '16px', objectFit: 'cover', maxHeight: '400px'}} />
              </div>
            </div>

            <div className="detail-section glass-card" style={{ marginTop: '2rem', padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ borderBottom: '2px solid var(--color-neutral)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Deskripsi Produk</h3>
              <p className="detail-description" style={{ whiteSpace: 'pre-line', color: 'var(--color-text)', lineHeight: '1.8' }}>
                {komoditas.deskripsi}
              </p>
            </div>

            {/* UMKM Profile Mini */}
            {komoditas.umkm && (
              <div className="detail-section" style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div 
                    style={{ 
                      width: '70px', height: '70px', borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: 'center', border: '3px solid var(--color-neutral)', boxShadow: 'var(--shadow-sm)',
                      backgroundImage: `url(${komoditas.umkm.logo || 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=100&q=80'})`
                    }}
                  ></div>
                  <div>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.25rem' }}>Diproduksi oleh:</span>
                    <h4 style={{ margin: '0', fontSize: '1.25rem', color: 'var(--color-text)' }}>{komoditas.umkm.nama}</h4>
                  </div>
                </div>
                <Link to={`/umkm/${komoditas.umkm.id}`} className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                  Lihat Profil & Etalase Komoditas <span>&rarr;</span>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar Booking Card */}
          <aside className="detail-sidebar">
            <div className="detail-price-card glass-card">
              <div className="detail-price-card__header">
                <span className="detail-price-card__label">Harga:</span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
                  <span className="detail-price-card__price">{komoditas.hargaFormatted || (komoditas.harga ? `Rp ${komoditas.harga}` : 'Tanya Admin')}</span>
                  {komoditas.satuan && (
                    <span className="detail-price-card__unit">/ {komoditas.satuan}</span>
                  )}
                </div>
              </div>
              <div className="detail-price-card__info" style={{ marginTop: '20px' }}>
                <div className="detail-info-row">
                  <span className="detail-info-row__icon">📞</span>
                  <div className="detail-info-row__text">
                    <strong>Contact Person</strong>
                    <p>{komoditas.umkm?.whatsapp || komoditas.whatsapp || 'Belum tersedia'}</p>
                  </div>
                </div>
              </div>
              <a
                href={`https://wa.me/${komoditas.umkm?.whatsapp || komoditas.whatsapp || '6281234567890'}?text=Halo%20Admin,%20saya%20tertarik%20dengan%20produk%20komoditas%20${encodeURIComponent(komoditas.nama)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand btn-lg btn-block"
                style={{ textAlign: 'center', marginTop: '1rem' }}
              >
                🛒 Pesan via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default DetailKomoditas;
