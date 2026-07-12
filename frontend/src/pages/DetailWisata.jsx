import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailWisata.css';

function DetailWisata() {
  const { id } = useParams();
  const [wisata, setWisata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGallery, setActiveGallery] = useState(0);

  const kategoriEmoji = {
    alam: '🏔️',
    budaya: '🎭',
    edukasi: '📚',
  };

  const kategoriGradient = {
    alam: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #34d399 100%)',
    budaya: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
    edukasi: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 50%, #60a5fa 100%)',
  };

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/wisata/${id}`);
        const data = await res.json();
        setWisata(data.data || null);
      } catch (err) {
        console.error('Error:', err);
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
          <span className="loading-text">Memuat detail wisata...</span>
        </div>
      </div>
    );
  }

  if (!wisata) {
    return (
      <div className="detail-page">
        <div className="detail-notfound">
          <span className="detail-notfound__icon">😕</span>
          <h2>Wisata Tidak Ditemukan</h2>
          <p>Destinasi yang Anda cari tidak tersedia.</p>
          <Link to="/wisata" className="btn btn-primary">
            ← Kembali ke Daftar Wisata
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {/* Hero Banner */}
      <div
        className="detail-hero"
        style={{ background: kategoriGradient[wisata.kategori] || kategoriGradient.alam }}
      >
        <div className="detail-hero__overlay"></div>
        <div className="detail-hero__content container">
          <Link to="/wisata" className="detail-hero__back">
            ← Kembali
          </Link>
          <div className="detail-hero__info fade-in">
            <span className={`badge badge-${wisata.kategori}`}>
              {kategoriEmoji[wisata.kategori]} {wisata.kategori}
            </span>
            <h1 className="detail-hero__title">{wisata.nama}</h1>
            <div className="detail-hero__meta">
              <span className="detail-hero__rating">⭐ {wisata.rating}</span>
              <span className="detail-hero__time">🕐 {wisata.jamOperasional}</span>
            </div>
          </div>
          <div className="detail-hero__emoji fade-in fade-in-delay-2">
            {kategoriEmoji[wisata.kategori] || '🌿'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content section">
        <div className="container">
          <div className="detail-layout">
            {/* Main Content */}
            <div className="detail-main">
              {/* Description */}
              <div className="detail-section fade-in">
                <h2 className="detail-section__title">Tentang Destinasi</h2>
                <p className="detail-section__text">{wisata.deskripsiLengkap}</p>
              </div>

              {/* Gallery */}
              <div className="detail-section fade-in fade-in-delay-1">
                <h2 className="detail-section__title">Galeri Foto</h2>
                <div className="detail-gallery">
                  <div
                    className="detail-gallery__main"
                    style={{
                      background: kategoriGradient[wisata.kategori] || kategoriGradient.alam,
                    }}
                  >
                    <span className="detail-gallery__emoji">
                      {kategoriEmoji[wisata.kategori]}
                    </span>
                    <span className="detail-gallery__label">
                      Foto {activeGallery + 1} dari {wisata.galeri.length}
                    </span>
                  </div>
                  <div className="detail-gallery__thumbs">
                    {wisata.galeri.map((_, idx) => (
                      <button
                        key={idx}
                        className={`detail-gallery__thumb ${idx === activeGallery ? 'detail-gallery__thumb--active' : ''}`}
                        onClick={() => setActiveGallery(idx)}
                        style={{
                          background: kategoriGradient[wisata.kategori] || kategoriGradient.alam,
                          opacity: idx === activeGallery ? 1 : 0.5,
                        }}
                      >
                        {kategoriEmoji[wisata.kategori]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div className="detail-section fade-in fade-in-delay-2">
                <h2 className="detail-section__title">Fasilitas</h2>
                <div className="detail-facilities">
                  {wisata.fasilitas.map((fas, idx) => (
                    <div key={idx} className="detail-facility">
                      <span className="detail-facility__icon">✓</span>
                      <span>{fas}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="detail-sidebar">
              <div className="detail-price-card glass-card fade-in fade-in-delay-1">
                <div className="detail-price-card__header">
                  <span className="detail-price-card__label">Harga Tiket</span>
                  <span className="detail-price-card__price">{wisata.hargaFormatted}</span>
                  {wisata.satuanHarga && (
                    <span className="detail-price-card__unit">{wisata.satuanHarga}</span>
                  )}
                </div>

                <div className="detail-price-card__info">
                  <div className="detail-price-card__row">
                    <span>🕐 Jam Operasional</span>
                    <span>{wisata.jamOperasional}</span>
                  </div>
                  <div className="detail-price-card__row">
                    <span>⭐ Rating</span>
                    <span>{wisata.rating} / 5.0</span>
                  </div>
                  <div className="detail-price-card__row">
                    <span>🏷️ Kategori</span>
                    <span style={{ textTransform: 'capitalize' }}>{wisata.kategori}</span>
                  </div>
                </div>

                <Link to="/kontak" className="btn btn-primary" style={{ width: '100%' }}>
                  Hubungi untuk Info →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailWisata;
