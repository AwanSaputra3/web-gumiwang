import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import WisataCard from '../components/WisataCard.jsx';
import './Beranda.css';

const getDirectImageUrl = (url) => {
  if (!url) return url;
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
};

const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11)
    ? `https://www.youtube.com/embed/${match[2]}`
    : null;
};

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
  const [wisata, setWisata] = useState([]);
  const [berita, setBerita] = useState(DEFAULT_BERITA_HOME);
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [desaRes, wisataRes, beritaRes, settingsRes] = await Promise.all([
          fetch('/api/desa'),
          fetch('/api/wisata'),
          fetch('/api/berita'),
          fetch('/api/settings')
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
        if (settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.data) {
            const homeSetting = settingsData.data.find(s => s.key === 'home');
            if (homeSetting && homeSetting.value) {
              try {
                setHomeData(JSON.parse(homeSetting.value));
              } catch (e) {
                console.error("Error parsing home data", e);
              }
            }
          }
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

  // Fallbacks for home data if not yet set in database
  const dHome = homeData || {};
  const heroData = dHome.hero || {
    title: "Eksplorasi<br/>Pesona Alam",
    subtitle: `Selamat Datang di ${desaName}, tempat dimana tradisi dan alam menyatu harmoni.`,
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1920&q=80"
  };
  
  const keajaibanData = dHome.keajaiban || {
    title: "Keajaiban Desa Kami",
    subtitle: "Temukan spot-spot menakjubkan yang belum pernah Anda kunjungi.",
    items: [
      { title: "Terasering Sawah Hijau", desc: "Nikmati pemandangan sawah berundak yang memanjakan mata.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80" },
      { title: "Perikanan Bioflok", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80" },
      { title: "Kebun Hidroponik", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80" },
      { title: "Kesenian Lokal", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" },
      { title: "Pusat Oleh-Oleh", image: "https://images.unsplash.com/photo-1621287955519-74e2d31bc40c?auto=format&fit=crop&w=800&q=80" }
    ]
  };

  const keunggulanData = dHome.keunggulan || {
    title: `Mengapa Berkunjung ke Deswita ${desaName}?`,
    subtitle: "Nikmati pengalaman berwisata otentik dengan beragam fasilitas dan keasrian alam yang memikat.",
    items: [
      { icon: "🌱", title: "Alam Asri & Sejuk", desc: "Dikelilingi pemandangan persawahan berundak dan udara pedesaan yang bebas dari polusi kota." },
      { icon: "🎭", title: "Kebudayaan Otentik", desc: "Rasakan hangatnya kearifan lokal, pertunjukan seni tradisional, serta keramahan warga desa." },
      { icon: "🐟", title: "Eduwisata Komprehensif", desc: "Program edukasi perikanan bioflok, pertanian hidroponik, dan olahan pangan khas untuk segala usia." },
      { icon: "🏡", title: "Fasilitas Nyaman", desc: "Tersedia homestay warga yang bersih, area parkir luas, tempat ibadah, serta kuliner lokal lezat." }
    ]
  };

  const statData = dHome.statistik || [
    { number: "15+", label: "Spot Wisata" },
    { number: "1.2k+", label: "Pengunjung / Bulan" },
    { number: "25+", label: "UMKM Lokal" },
    { number: "100%", label: "Ramah Lingkungan" }
  ];

  const videoData = dHome.video || {
    title: `Saksikan Keindahan ${desaName}`,
    subtitle: "Jelajahi keasrian desa, keramahan warga, dan kekayaan budaya yang kami tawarkan melalui dokumenter eksklusif ini."
  };

  const mitraData = dHome.mitra || [
    "Dinas Pariwisata", "Kemenparekraf", "Universitas Lokal", "Pokdarwis"
  ];

  return (
    <div className="page-beranda">
      {/* 1. Hero Section - Left Aligned with Pill Search */}
      <HeroSection
        title={<span dangerouslySetInnerHTML={{ __html: heroData.title }}></span>}
        description={heroData.subtitle}
        image={heroData.image}
      />

      {/* 2. Destinasi - Featured Grid */}
      <section className="section bg-neutral" style={{ paddingTop: '60px' }}>
        <div className="container">
          <div className="section-header-alt">
            <h2 className="main-title">{keajaibanData.title}</h2>
            <p>{keajaibanData.subtitle}</p>
          </div>
          
          <div className="destinasi-featured-grid">
            {keajaibanData.items && keajaibanData.items.length > 0 && (
              <div className="bento-item featured-main" style={{backgroundImage: `url(${keajaibanData.items[0]?.image})`}}>
                <div className="bento-overlay gradient-dark"></div>
                <div className="bento-content">
                  <span className="bento-label">Terpopuler</span>
                  <h2>{keajaibanData.items[0]?.title}</h2>
                  <p>{keajaibanData.items[0]?.desc}</p>
                </div>
              </div>
            )}
            
            <div className="featured-subgrid">
              {keajaibanData.items && keajaibanData.items.slice(1, 5).map((item, idx) => (
                <div key={idx} className="bento-item" style={{backgroundImage: `url(${item.image})`}}>
                  <div className="bento-overlay"></div>
                  <div className="bento-content">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Keunggulan & Statistik Desa Wisata */}
      <section className="section keunggulan-section bg-light">
        <div className="container">
          <div className="section-header-alt text-center" style={{ marginBottom: '40px' }}>
            <span className="cursive-label" style={{ display: 'block', marginBottom: '10px', transform: 'none' }}>Keunggulan Kami</span>
            <h2 className="main-title">{keunggulanData.title}</h2>
            <p className="section-subtitle" style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
              {keunggulanData.subtitle}
            </p>
          </div>

          <div className="keunggulan-grid">
            {keunggulanData.items.map((item, idx) => (
              <div key={idx} className="keunggulan-card">
                <div className="keunggulan-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Counter Stats Bar */}
          <div className="stats-banner-container">
            {statData.map((stat, idx) => (
              <React.Fragment key={idx}>
                <div className="stats-item">
                  <div className="stats-number">{stat.number}</div>
                  <div className="stats-label">{stat.label}</div>
                </div>
                {idx < statData.length - 1 && <div className="stats-divider"></div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Wisata Populer */}
      <section className="section bg-white">
        <div className="container">
          <div className="section-header-alt text-center">
            <span className="cursive-label" style={{display: 'block', marginBottom: '10px', transform: 'none'}}>Favorit Pengunjung</span>
            <h2 className="main-title">Wisata Populer</h2>
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
              <h2>{videoData.title}</h2>
              <p>{videoData.subtitle}</p>
            </div>
            <div className="video-player-part">
              {getYoutubeEmbedUrl(videoData.youtubeUrl) ? (
                <iframe 
                  width="100%" 
                  height="400" 
                  src={getYoutubeEmbedUrl(videoData.youtubeUrl)} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  style={{ borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)' }}
                ></iframe>
              ) : (
                <div className="video-thumbnail" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=1000&q=80)'}}>
                  <button className="play-button-elegant">
                    <span>▶</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Mitra Kami - Clean Grayscale */}
      <section className="mitra-section-clean">
        <div className="container">
          <div className="mitra-container-clean">
            <span className="mitra-label-clean">Didukung Oleh:</span>
            <div className="mitra-logos-scroll">
              {mitraData.map((mitra, idx) => (
                <div key={idx} className="mitra-logo-item">{mitra}</div>
              ))}
            </div>
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
              <article className="berita-card-featured" style={{backgroundImage: `url("${getDirectImageUrl(berita[0].image) || 'https://images.unsplash.com/photo-1586771107445-d3af8e3b3a39?auto=format&fit=crop&w=800&q=80'}")`}}>
                <div className="berita-featured-overlay"></div>
                <div className="berita-featured-content">
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
                  <div className="berita-side-image" style={{backgroundImage: `url("${getDirectImageUrl(item.image) || 'https://images.unsplash.com/photo-1586771107445-d3af8e3b3a39?auto=format&fit=crop&w=400&q=80'}")`}}></div>
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
