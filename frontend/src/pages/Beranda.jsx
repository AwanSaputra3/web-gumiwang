import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import WisataCard from '../components/WisataCard.jsx';
import './Beranda.css';

const DEFAULT_WISATA_HOME = [
  {
    id: 1,
    nama: "Wisata Edukasi Perikanan",
    slug: "edukasi-perikanan",
    kategori: "edukasi",
    deskripsiSingkat: "Belajar budidaya ikan lele dan nila langsung dari peternak sukses Gumiwang.",
    harga: 15000,
    hargaFormatted: "Rp 15.000",
    satuanHarga: "per orang",
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    nama: "Agrowisata Sawah Hijau",
    slug: "agrowisata-sawah",
    kategori: "alam",
    deskripsiSingkat: "Menikmati hamparan sawah hijau sambil belajar bertani secara tradisional.",
    harga: 10000,
    hargaFormatted: "Rp 10.000",
    satuanHarga: "per orang",
    rating: 4.6,
    featured: true,
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    nama: "Susur Sungai & Tubing Gumiwang",
    slug: "tubing-sungai-gumiwang",
    kategori: "petualangan",
    deskripsiSingkat: "Petualangan seru menyusuri aliran sungai jernih berbalut pemandangan perbukitan.",
    harga: 40000,
    hargaFormatted: "Rp 40.000",
    satuanHarga: "per orang",
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    nama: "Camping Ground Bukit Gumiwang",
    slug: "camping-ground-bukit",
    kategori: "alam",
    deskripsiSingkat: "Berkemah di atas bukit dengan panorama sunset dan city light malam hari.",
    harga: 25000,
    hargaFormatted: "Rp 25.000",
    satuanHarga: "per orang / malam",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  }
];

const DEFAULT_BERITA_HOME = [
  {
    id: 1,
    judul: "Panen Raya Lele Sukses Digelar",
    ringkasan: "Kelompok pembudidaya ikan Desa Gumiwang berhasil melakukan panen raya lele dengan total hasil mencapai 5 ton.",
    tanggal: "20 Oktober 2025",
    kategori: "Perikanan",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    judul: "Desa Gumiwang Kembangkan Beras Organik",
    ringkasan: "Gabungan kelompok tani mulai menerapkan sistem pertanian organik untuk tanaman padi.",
    tanggal: "12 November 2025",
    kategori: "Pertanian",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    judul: "Pelatihan Olahan Hasil Ikan untuk KWT",
    ringkasan: "Kelompok Wanita Tani (KWT) mendapatkan pelatihan pembuatan abon dan nugget lele.",
    tanggal: "05 Desember 2025",
    kategori: "UMKM",
    image: "https://images.unsplash.com/photo-1582285516943-34e8be3426cb?auto=format&fit=crop&w=800&q=80"
  }
];

function Beranda() {
  const [desa, setDesa] = useState({ nama: "Desa Gumiwang" });
  const [wisata, setWisata] = useState(DEFAULT_WISATA_HOME);
  const [berita, setBerita] = useState(DEFAULT_BERITA_HOME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [desaRes, wisataRes, beritaRes] = await Promise.all([
          fetch('/api/desa'),
          fetch('/api/wisata/featured'),
          fetch('/api/berita')
        ]);

        if (desaRes.ok) {
          const desaData = await desaRes.json();
          if (desaData.data) setDesa(desaData.data);
        }
        if (wisataRes.ok) {
          const wisataData = await wisataRes.json();
          if (wisataData.data && wisataData.data.length > 0) setWisata(wisataData.data);
        }
        if (beritaRes.ok) {
          const beritaData = await beritaRes.json();
          if (beritaData.data && beritaData.data.length > 0) setBerita(beritaData.data.slice(0, 3));
        }
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
      <HeroSection
        title={<>Eksplorasi<br/>Pesona Alam</>}
        description={`Selamat Datang di ${desaName}, tempat dimana tradisi dan alam menyatu harmoni.`}
        showSearch={true}
        image="https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1920&q=80"
      />

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

      {/* 3. Keunggulan & Statistik Desa Wisata */}
      <section className="section keunggulan-section bg-light">
        <div className="container">
          <div className="section-header-alt text-center" style={{ marginBottom: '40px' }}>
            <span className="cursive-label" style={{ display: 'block', marginBottom: '10px', transform: 'none' }}>Keunggulan Kami</span>
            <h2 className="main-title">Mengapa Berkunjung ke Deswita {desaName}?</h2>
            <p className="section-subtitle" style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Nikmati pengalaman berwisata otentik dengan beragam fasilitas dan keasrian alam yang memikat.
            </p>
          </div>

          <div className="keunggulan-grid">
            <div className="keunggulan-card">
              <div className="keunggulan-icon">🌱</div>
              <h3>Alam Asri & Sejuk</h3>
              <p>Dikelilingi pemandangan persawahan berundak dan udara pedesaan yang bebas dari polusi kota.</p>
            </div>

            <div className="keunggulan-card">
              <div className="keunggulan-icon">🎭</div>
              <h3>Kebudayaan Otentik</h3>
              <p>Rasakan hangatnya kearifan lokal, pertunjukan seni tradisional, serta keramahan warga desa.</p>
            </div>

            <div className="keunggulan-card">
              <div className="keunggulan-icon">🐟</div>
              <h3>Eduwisata Komprehensif</h3>
              <p>Program edukasi perikanan bioflok, pertanian hidroponik, dan olahan pangan khas untuk segala usia.</p>
            </div>

            <div className="keunggulan-card">
              <div className="keunggulan-icon">🏡</div>
              <h3>Fasilitas Nyaman</h3>
              <p>Tersedia homestay warga yang bersih, area parkir luas, tempat ibadah, serta kuliner lokal lezat.</p>
            </div>
          </div>

          {/* Counter Stats Bar */}
          <div className="stats-banner-container">
            <div className="stats-item">
              <div className="stats-number">15+</div>
              <div className="stats-label">Spot Wisata</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <div className="stats-number">1.2k+</div>
              <div className="stats-label">Pengunjung / Bulan</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <div className="stats-number">25+</div>
              <div className="stats-label">UMKM Lokal</div>
            </div>
            <div className="stats-divider"></div>
            <div className="stats-item">
              <div className="stats-number">100%</div>
              <div className="stats-label">Ramah Lingkungan</div>
            </div>
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
