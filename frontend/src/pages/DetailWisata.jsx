import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailWisata.css';

const DEFAULT_WISATA_MAP = {};

function DetailWisata() {
  const { id } = useParams();
  const [wisata, setWisata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeGallery, setActiveGallery] = useState(0);

  const kategoriEmoji = {
    alam: '🏔️',
    budaya: '🎭',
    edukasi: '📚',
    petualangan: '🚣',
    kuliner: '🍲',
  };

  const kategoriGradient = {
    alam: 'linear-gradient(135deg, #d1fae5 0%, #6ee7b7 50%, #34d399 100%)',
    budaya: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)',
    edukasi: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 50%, #60a5fa 100%)',
    petualangan: 'linear-gradient(135deg, #fee2e2 0%, #fca5a5 50%, #f87171 100%)',
    kuliner: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 50%, #fb923c 100%)',
  };

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/wisata/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setWisata(data.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching detail wisata:', err);
      }

      // Fallback detail
      setWisata(DEFAULT_WISATA_MAP[id] || DEFAULT_WISATA_MAP["1"]);
      setLoading(false);
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

  const galleryImages = [
    wisata.image,
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80',
  ];

  return (
    <div className="detail-page">
      {/* Hero Banner */}
      <section className="detail-hero" style={{ backgroundImage: `url(${galleryImages[activeGallery]})` }}>
        <div className="detail-hero__overlay"></div>
        <div className="container detail-hero__container" style={{ paddingTop: '10rem', paddingBottom: '3rem', position: 'relative', zIndex: 2 }}>
          <Link to="/wisata" className="detail-back-link">
            ← Kembali ke Daftar Wisata
          </Link>
          <div style={{ background: 'rgba(0, 0, 0, 0.6)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'inline-block', maxWidth: '1000px', border: '1px solid rgba(255,255,255,0.2)', marginTop: '2rem' }}>
            <h1 className="detail-hero__title" style={{ margin: 0 }}>{wisata.nama}</h1>
            <p className="detail-hero__subtitle" style={{ margin: '0.5rem 0 0 0', color: 'rgba(255,255,255,0.9)' }}>{wisata.deskripsiSingkat}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container detail-layout">
          {/* Main Info */}
          <div className="detail-main">
            {/* Gallery Thumbnails */}
            <div className="detail-gallery" style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>Galeri Foto</h3>
              <div className="detail-gallery__thumbs">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`detail-gallery__thumb ${activeGallery === idx ? 'detail-gallery__thumb--active' : ''}`}
                    onClick={() => setActiveGallery(idx)}
                  >
                    <img src={img} alt={`${wisata.nama} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="detail-section glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
              <h3 style={{ borderBottom: '2px solid var(--color-border-light)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Deskripsi Destinasi</h3>
              <p className="detail-description" style={{ lineHeight: '1.8', whiteSpace: 'pre-line' }}>{wisata.deskripsiLengkap}</p>
            </div>

            {/* Facilities */}
            {Array.isArray(wisata.fasilitas) && wisata.fasilitas.length > 0 && (
              <div className="detail-section glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)' }}>
                <h3 style={{ borderBottom: '2px solid var(--color-border-light)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Fasilitas yang Tersedia</h3>
                <div className="detail-facilities">
                  {wisata.fasilitas.map((fas, idx) => (
                    <div key={idx} className="facility-chip">
                      <span className="facility-chip__icon">✔</span>
                      <span>{fas}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Booking Card */}
          <aside className="detail-sidebar">
            <div className="detail-price-card glass-card">
              <div className="detail-price-card__header">
                <span className="detail-price-card__label">Tiket / Biaya:</span>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '8px' }}>
                  <span className="detail-price-card__price">{wisata.hargaFormatted}</span>
                  {wisata.satuanHarga && (
                    <span className="detail-price-card__unit">/ {wisata.satuanHarga}</span>
                  )}
                </div>
              </div>

              <div className="detail-price-card__info">
                <div className="detail-info-row">
                  <span className="detail-info-row__icon">⏰</span>
                  <div className="detail-info-row__text">
                    <strong>Jam Operasional</strong>
                    <p>{wisata.jamOperasional || '08.00 - 16.00 WIB'}</p>
                  </div>
                </div>
                <div className="detail-info-row">
                  <span className="detail-info-row__icon">⭐</span>
                  <div className="detail-info-row__text">
                    <strong>Rating Wisatawan</strong>
                    <p>{wisata.rating || '4.8'} / 5.0 (Berdasarkan ulasan)</p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${wisata.whatsapp || '6281234567890'}?text=Halo%20Pemdes%20Gumiwang,%20saya%20tertarik%20dengan%20wisata%20${encodeURIComponent(wisata.nama)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand btn-lg btn-block"
                style={{ textAlign: 'center', marginTop: '1rem' }}
              >
                🎟️ Pesan Tiket / Info WA
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default DetailWisata;
