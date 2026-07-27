import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailWisata.css';

const DEFAULT_WISATA_MAP = {
  "1": {
    id: 1,
    nama: "Wisata Edukasi Perikanan",
    slug: "edukasi-perikanan",
    kategori: "edukasi",
    deskripsiSingkat: "Belajar budidaya ikan lele dan nila langsung dari peternak sukses Gumiwang.",
    deskripsiLengkap: "Wisata Edukasi Perikanan Gumiwang mengajak pengunjung untuk melihat langsung proses budidaya ikan air tawar dari pembibitan hingga panen. Pengunjung, terutama anak-anak sekolah dan mahasiswa, dapat mempraktikkan cara memberi makan ikan, membedakan jenis kelamin induk ikan, hingga belajar teknologi bioflok yang diterapkan oleh peternak desa.",
    harga: 15000,
    hargaFormatted: "Rp 15.000",
    satuanHarga: "per orang",
    fasilitas: ["Pemandu Lapangan", "Pakan Ikan", "Modul Belajar", "Toilet & Kamar Mandi", "Spot Foto", "Area Parkir"],
    jamOperasional: "08.00 - 15.00 WIB",
    rating: 4.8,
    featured: true,
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  "2": {
    id: 2,
    nama: "Agrowisata Sawah Hijau",
    slug: "agrowisata-sawah",
    kategori: "alam",
    deskripsiSingkat: "Menikmati hamparan sawah hijau sambil belajar bertani secara tradisional.",
    deskripsiLengkap: "Destinasi ini menawarkan ketenangan dengan pemandangan hamparan sawah yang luas dan udara pedesaan yang sejuk. Selain menikmati pemandangan, pengunjung dapat ikut turun ke sawah untuk belajar menanam padi (tandur), membajak sawah dengan kerbau, atau ikut serta dalam panen padi pada musimnya.",
    harga: 10000,
    hargaFormatted: "Rp 10.000",
    satuanHarga: "per orang",
    fasilitas: ["Spot Foto Terasering", "Gazebo Istirahat", "Pemandu", "Area Cuci Kaki", "Warung Kuliner"],
    jamOperasional: "06.00 - 17.00 WIB",
    rating: 4.6,
    featured: true,
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80"
  },
  "3": {
    id: 3,
    nama: "Workshop Pengolahan Lele",
    slug: "workshop-olahan-lele",
    kategori: "edukasi",
    deskripsiSingkat: "Pelatihan membuat aneka olahan pangan bernilai jual dari ikan lele.",
    deskripsiLengkap: "Bersama ibu-ibu PKK dan Kelompok Wanita Tani, pengunjung diajak untuk praktik langsung membuat aneka olahan berbahan dasar lele seperti abon lele, nugget lele, hingga kerupuk lele. Hasil praktik bisa dibawa pulang sebagai oleh-oleh.",
    harga: 35000,
    hargaFormatted: "Rp 35.000",
    satuanHarga: "per orang (termasuk hasil olahan)",
    fasilitas: ["Bahan Baku Olahan", "Alat Masak Lengkap", "Instruktur Kuliner", "Ruang Higienis", "Kemasan Oleh-oleh"],
    jamOperasional: "09.00 - 14.00 WIB (Sabtu/Minggu)",
    rating: 4.7,
    featured: false,
    image: "https://images.unsplash.com/photo-1582285516943-34e8be3426cb?auto=format&fit=crop&w=800&q=80"
  },
  "4": {
    id: 4,
    nama: "Susur Sungai & Tubing Gumiwang",
    slug: "tubing-sungai-gumiwang",
    kategori: "petualangan",
    deskripsiSingkat: "Petualangan seru menyusuri aliran sungai jernih berbalut pemandangan perbukitan.",
    deskripsiLengkap: "Rasakan sensasi petualangan mengarungi aliran sungai bersih Gumiwang menggunakan ban pelampung. Rute sepanjang 2 km menyajikan jeram-jeram ringan yang aman untuk keluarga dan teman-teman, dipandu instruktur berpengalaman.",
    harga: 40000,
    hargaFormatted: "Rp 40.000",
    satuanHarga: "per orang",
    fasilitas: ["Pelampung & Helm", "Pemandu Lapangan", "Dokumentasi Foto", "Teh Hangat & Mendoan", "Kamar Bilas"],
    jamOperasional: "08.30 - 16.00 WIB",
    rating: 4.9,
    featured: true,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  },
  "5": {
    id: 5,
    nama: "Camping Ground Bukit Gumiwang",
    slug: "camping-ground-bukit",
    kategori: "alam",
    deskripsiSingkat: "Berkemah di atas bukit dengan panorama sunset dan city light malam hari.",
    deskripsiLengkap: "Area berkemah yang tenang di dataran tinggi Gumiwang. Menawarkan pemandangan matahari terbenam yang memukau serta suasana malam bertabur bintang dan hamparan lampu kota dari kejauhan.",
    harga: 25000,
    hargaFormatted: "Rp 25.000",
    satuanHarga: "per orang / malam",
    fasilitas: ["Toilet & Kamar Mandi", "Sewa Tenda & Matras", "Api Unggun", "Keamanan 24 Jam", "Kantin 24 Jam"],
    jamOperasional: "24 Jam",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  "6": {
    id: 6,
    nama: "Pasar Wisata Kuliner Olahan Desa",
    slug: "pasar-kuliner-desa",
    kategori: "kuliner",
    deskripsiSingkat: "Pusat jajanan tradisional dan masakan khas olahan ikan lele & nila segar.",
    deskripsiLengkap: "Nikmati ragam hidangan khas pedesaan Banjarnegara seperti mendoan hangat, es dawet ayu, lele bakar kecap khas Gumiwang, serta jajanan pasar tradisional yang disajikan di area taman terbuka yang asri.",
    harga: 5000,
    hargaFormatted: "Rp 5.000",
    satuanHarga: "tiket masuk",
    fasilitas: ["Area Parkir Luas", "Meja Makan Taman", "Live Music Akustik", "Mushola Clean", "Toilet"],
    jamOperasional: "07.00 - 16.00 WIB (Akhir Pekan)",
    rating: 4.5,
    featured: false,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
  },
  "7": {
    id: 7,
    nama: "Sanggar Seni & Tari Gumiwang",
    slug: "sanggar-seni-tari",
    kategori: "budaya",
    deskripsiSingkat: "Menyaksikan dan belajar tarian serta gamelan tradisional Jawa bersama seniman lokal.",
    deskripsiLengkap: "Destinasi wisata budaya di mana wisatawan bisa menonton pertunjukan seni gamelan dan tari tradisional, serta berkesempatan belajar langsung memainkan gamelan atau menari bersama warga desa.",
    harga: 20000,
    hargaFormatted: "Rp 20.000",
    satuanHarga: "per orang",
    fasilitas: ["Panggung Pentas", "Alat Musik Gamelan", "Kostum Tari", "Instruktur Seni", "Foto Bersama"],
    jamOperasional: "10.00 - 16.00 WIB",
    rating: 4.8,
    featured: false,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
  },
  "8": {
    id: 8,
    nama: "Wisata Petik Sayur Organik",
    slug: "wisata-petik-sayur",
    kategori: "edukasi",
    deskripsiSingkat: "Petik langsung sayuran bebas pestisida di kebun hidroponik & tanah organik.",
    deskripsiLengkap: "Pengalaman edukatif memetik sayuran hidroponik segar seperti bayam merah, pakcoy, dan tomat buah langsung dari pohonnya. Sayuran yang dipetik dapat ditimbang dan dibawa pulang dengan harga terjangkau.",
    harga: 15000,
    hargaFormatted: "Rp 15.000",
    satuanHarga: "per orang",
    fasilitas: ["Keranjang Petik", "Topi Caping", "Keran Air Bersih", "Timbangan Digital", "Pembungkus Ramah Lingkungan"],
    jamOperasional: "07.00 - 15.00 WIB",
    rating: 4.7,
    featured: true,
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80"
  }
};

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

  const emoji = kategoriEmoji[wisata.kategori?.toLowerCase()] || '✨';
  const bgGradient = kategoriGradient[wisata.kategori?.toLowerCase()] || 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)';

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
        <div className="container detail-hero__container">
          <Link to="/wisata" className="detail-back-link">
            ← Kembali ke Daftar Wisata
          </Link>
          <div className="detail-hero__badges">
            <span className="detail-badge detail-badge--category" style={{ background: bgGradient }}>
              {emoji} {wisata.kategori?.toUpperCase()}
            </span>
            {wisata.featured && (
              <span className="detail-badge detail-badge--featured">
                ⭐ Terfavorit
              </span>
            )}
          </div>
          <h1 className="detail-hero__title">{wisata.nama}</h1>
          <p className="detail-hero__subtitle">{wisata.deskripsiSingkat}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container detail-layout">
          {/* Main Info */}
          <div className="detail-main">
            {/* Gallery Thumbnails */}
            <div className="detail-gallery">
              <h3>Galeri Foto</h3>
              <div className="detail-gallery__grid">
                {galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`detail-gallery__thumb ${activeGallery === idx ? 'active' : ''}`}
                    onClick={() => setActiveGallery(idx)}
                  >
                    <img src={img} alt={`${wisata.nama} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <h3>Deskripsi Destinasi</h3>
              <p className="detail-description">{wisata.deskripsiLengkap}</p>
            </div>

            {/* Facilities */}
            {wisata.fasilitas && wisata.fasilitas.length > 0 && (
              <div className="detail-section">
                <h3>Fasilitas yang Tersedia</h3>
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
            <div className="detail-card glass-card">
              <div className="detail-card__price">
                <span className="price-label">Tiket / Biaya:</span>
                <div className="price-amount">{wisata.hargaFormatted}</div>
                {wisata.satuanHarga && (
                  <span className="price-unit">/ {wisata.satuanHarga}</span>
                )}
              </div>

              <div className="detail-card__info">
                <div className="info-row">
                  <span className="info-row__icon">⏰</span>
                  <div>
                    <strong>Jam Operasional</strong>
                    <p>{wisata.jamOperasional || '08.00 - 16.00 WIB'}</p>
                  </div>
                </div>
                <div className="info-row">
                  <span className="info-row__icon">⭐</span>
                  <div>
                    <strong>Rating Wisatawan</strong>
                    <p>{wisata.rating || '4.8'} / 5.0 (Berdasarkan ulasan)</p>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/6281234567890?text=Halo%20Pemdes%20Gumiwang,%20saya%20tertarik%20dengan%20wisata%20${encodeURIComponent(wisata.nama)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-brand btn-lg btn-block"
                style={{ textAlign: 'center', marginTop: '1rem' }}
              >
                📱 Pesan Tiket / Info WA
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default DetailWisata;
