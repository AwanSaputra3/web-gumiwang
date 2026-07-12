import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import WisataCard from '../components/WisataCard.jsx';
import './Beranda.css';

function Beranda() {
  const [desa, setDesa] = useState(null);
  const [wisata, setWisata] = useState([]);
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [desaRes, wisataRes, beritaRes] = await Promise.all([
          fetch('/api/desa'),
          fetch('/api/wisata/featured'),
          fetch('/api/berita')
        ]);

        const desaData = await desaRes.json();
        const wisataData = await wisataRes.json();
        const beritaData = await beritaRes.json();

        setDesa(desaData.data);
        setWisata(wisataData.data); // Use all data for carousel
        setBerita(beritaData.data.slice(0, 3));
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '100vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const desaName = desa?.nama?.replace('Desa ', '') || 'Gumiwang';

  return (
    <div className="page-beranda">
      {/* 1. Hero Section - Left Aligned with Pill Search */}
      <section className="hero-new hero-improvised">
        <div className="hero-new__bg">
          <img src="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1920&q=80" alt="Rice Terraces" />
          <div className="hero-new__overlay gradient-overlay"></div>
        </div>
        <div className="container hero-container-alt">
          <div className="hero-content-left">
            <h1 className="hero-new__title">Eksplorasi<br/>Pesona Alam</h1>
            <p className="hero-new__subtitle">Selamat Datang di {desaName}, tempat dimana tradisi dan alam menyatu harmoni.</p>
            
            {/* Pill Search Bar */}
            <div className="hero-search-pill glass-card">
              <div className="search-pill-field">
                <span className="icon">📍</span>
                <span>Cari Destinasi...</span>
              </div>
              <button className="btn btn-brand search-btn-round">Cari</button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Destinasi - Featured Grid */}
      <section className="section bg-neutral" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header-alt">
            <h2 className="main-title">Keajaiban Desa Kami</h2>
            <p>Temukan spot-spot menakjubkan yang belum pernah Anda kunjungi.</p>
          </div>
          
          <div className="destinasi-featured-grid">
            <div className="bento-item featured-main" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80)'}}>
              <div className="bento-overlay gradient-dark"></div>
              <div className="bento-content">
                <span className="bento-label">Terpopuler</span>
                <h2>Terasering Sawah Hijau</h2>
                <p>Nikmati pemandangan sawah berundak yang memanjakan mata.</p>
              </div>
            </div>
            
            <div className="featured-subgrid">
              <div className="bento-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80)'}}>
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <h3>Perikanan Bioflok</h3>
                </div>
              </div>
              <div className="bento-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80)'}}>
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <h3>Kebun Hidroponik</h3>
                </div>
              </div>
              <div className="bento-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80)'}}>
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <h3>Kesenian Lokal</h3>
                </div>
              </div>
              <div className="bento-item" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1621287955519-74e2d31bc40c?auto=format&fit=crop&w=800&q=80)'}}>
                <div className="bento-overlay"></div>
                <div className="bento-content">
                  <h3>Pusat Oleh-Oleh</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Promo Section - Full width banner */}
      <section className="section promo-banner">
        <div className="promo-banner-bg" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1920&q=80)'}}></div>
        <div className="promo-banner-overlay"></div>
        <div className="container promo-banner-container">
          <div className="promo-glass-card glass-card">
            <div className="promo-tag">Eksklusif</div>
            <h2 className="promo-title-alt">Diskon 30% Paket Petualangan</h2>
            <p>Rencanakan liburan akhir pekan Anda bersama keluarga di Deswita{desaName}. Promo berlaku hingga akhir bulan.</p>
            <Link to="/wisata" className="btn btn-brand btn-lg" style={{marginTop: '1rem'}}>Klaim Promo</Link>
          </div>
        </div>
      </section>

      {/* 4. Wisata Populer */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header-alt text-center">
            <span className="cursive-label" style={{display: 'block', marginBottom: '10px', transform: 'none'}}>Favorit Pengunjung</span>
            <h2 className="main-title">Paket Wisata Populer</h2>
          </div>
          
          <div className="wisata-populer-grid">
            {wisata.map((item, idx) => (
              <div key={item.id} className={`fade-in fade-in-delay-${idx}`}>
                <WisataCard wisata={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video Gallery - Split Design */}
      <section className="video-section-split bg-light">
        <div className="container">
          <div className="video-split-container">
            <div className="video-text-part">
              <span className="cursive-label" style={{transform: 'none'}}>Cerita Kami</span>
              <h2>Saksikan Keindahan {desaName}</h2>
              <p>Jelajahi keasrian desa, keramahan warga, dan kekayaan budaya yang kami tawarkan melalui dokumenter eksklusif ini.</p>
              <Link to="/galeri" className="btn btn-outline" style={{marginTop: '1rem'}}>Lihat Galeri Lengkap</Link>
            </div>
            <div className="video-player-part">
              <div className="video-thumbnail" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=1000&q=80)'}}>
                <button className="play-button-elegant">
                  <span>▶</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mitra Kami - Clean Grayscale */}
      <section className="mitra-section-clean">
        <div className="container">
          <div className="mitra-logos-clean">
            <span className="mitra-label-clean">Didukung Oleh:</span>
            <div className="mitra-logo-item">Dinas Pariwisata</div>
            <div className="mitra-logo-item">Kemenparekraf</div>
            <div className="mitra-logo-item">Universitas Lokal</div>
            <div className="mitra-logo-item">Pokdarwis</div>
          </div>
        </div>
      </section>

      {/* 7. Berita - Magazine Style */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header-alt text-center">
            <h2 className="main-title">Kabar Terbaru</h2>
          </div>
          
          <div className="berita-magazine-grid">
            {/* Featured Article */}
            {berita.length > 0 && (
              <article className="berita-card-featured" style={{backgroundImage: `url(${berita[0].image || 'https://images.unsplash.com/photo-1586771107445-d3af8e3b3a39?auto=format&fit=crop&w=800&q=80'})`}}>
                <div className="berita-featured-overlay"></div>
                <div className="berita-featured-content">
                  <span className="berita-category-pill">{berita[0].kategori}</span>
                  <h3>{berita[0].judul}</h3>
                  <p>{berita[0].tanggal}</p>
                  <Link to="/berita" className="btn btn-brand btn-sm" style={{marginTop: '10px'}}>Baca Artikel</Link>
                </div>
              </article>
            )}

            {/* List Articles */}
            <div className="berita-list-side">
              {berita.slice(1).map((item) => (
                <article key={item.id} className="berita-card-side">
                  <div className="berita-side-image" style={{backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1586771107445-d3af8e3b3a39?auto=format&fit=crop&w=400&q=80'})`}}></div>
                  <div className="berita-side-content">
                    <span className="berita-meta">{item.tanggal}</span>
                    <h4>{item.judul}</h4>
                    <Link to="/berita" className="berita-link">Baca Selengkapnya →</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

export default Beranda;
