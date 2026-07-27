import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './Galeri.css';

const DEFAULT_GALERI_LIST = [
  {
    id: 1,
    judul: "Panen Raya Padi Organik",
    kategori: "Pertanian",
    tanggal: "15 Agustus 2025",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    judul: "Kegiatan Tebar Benih Ikan",
    kategori: "Perikanan",
    tanggal: "02 September 2025",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    judul: "Pelatihan Olahan Ikan Lele KWT",
    kategori: "UMKM",
    tanggal: "20 September 2025",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    judul: "Pemandangan Sawah Gumiwang",
    kategori: "Alam",
    tanggal: "10 Oktober 2025",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    judul: "Kunjungan Wisata Edukasi SD",
    kategori: "Edukasi",
    tanggal: "05 November 2025",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    judul: "Pasar Desa Produk UMKM",
    kategori: "Kegiatan",
    tanggal: "12 November 2025",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    judul: "Pelatihan Pembuatan Bioflok Modern",
    kategori: "Perikanan",
    tanggal: "01 Desember 2025",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    judul: "Pentas Seni Kuda Lumping Gumiwang",
    kategori: "Budaya",
    tanggal: "25 Desember 2025",
    image: "https://images.unsplash.com/photo-1621287955519-74e2d31bc40c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    judul: "Sunrise di Bukit Gumiwang",
    kategori: "Alam",
    tanggal: "01 Januari 2026",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    judul: "Pameran Produk Olahan Lele",
    kategori: "UMKM",
    tanggal: "15 Januari 2026",
    image: "https://images.unsplash.com/photo-1582285516943-34e8be3426cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    judul: "Gotong Royong Kebersihan Sungai",
    kategori: "Kegiatan",
    tanggal: "10 Februari 2026",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    judul: "Aksi Susur Sungai & Tubing",
    kategori: "Petualangan",
    tanggal: "20 Februari 2026",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  }
];

function Galeri() {
  const [galeri, setGaleri] = useState(DEFAULT_GALERI_LIST);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGaleri() {
      try {
        const res = await fetch('/api/galeri');
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setGaleri(data.data);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGaleri();
  }, []);

  return (
    <div className="page-galeri">
      <HeroSection
        compact
        subtitle="Momen & Kegiatan"
        title="Galeri Desa"
        description="Dokumentasi aktivitas pertanian, perikanan, dan kehidupan bermasyarakat di Desa Gumiwang."
        image="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="galeri-grid">
              {galeri.map((item, idx) => (
                <div key={item.id} className={`galeri-item fade-in fade-in-delay-${idx % 4}`}>
                  <div className={`galeri-item__image galeri-item__image--${item.kategori.toLowerCase()}`}>
                    {item.image ? (
                      <img src={item.image} alt={item.judul} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span className="galeri-item__icon">📸</span>
                    )}
                  </div>
                  <div className="galeri-item__overlay">
                    <span className="galeri-item__category">{item.kategori}</span>
                    <h3 className="galeri-item__title">{item.judul}</h3>
                    <span className="galeri-item__date">{item.tanggal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Galeri;
