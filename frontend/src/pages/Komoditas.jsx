import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import KategoriFilter from '../components/KategoriFilter.jsx';
import KomoditasCard from '../components/KomoditasCard.jsx';
import './Komoditas.css';

const DEFAULT_KOMODITAS_LIST = [
  {
    id: 1,
    nama: "Beras Organik Gumiwang",
    kategori: "pertanian",
    deskripsi: "Beras organik berkualitas tinggi hasil panen petani lokal Desa Gumiwang. Ditanam tanpa pestisida kimia, menghasilkan nasi yang lebih pulen dan sehat.",
    harga: 15000,
    hargaFormatted: "Rp 15.000",
    satuan: "per kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    nama: "Sayuran Segar Hidroponik",
    kategori: "pertanian",
    deskripsi: "Berbagai jenis sayuran segar seperti selada, pakcoy, dan kangkung yang ditanam menggunakan sistem hidroponik bersih dan bebas pestisida.",
    harga: 5000,
    hargaFormatted: "Rp 5.000",
    satuan: "per ikat",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    nama: "Bibit Ikan Lele Sangkuriang",
    kategori: "perikanan",
    deskripsi: "Bibit lele unggulan jenis Sangkuriang yang sehat dan cepat besar. Cocok untuk budidaya kolam terpal maupun kolam tanah.",
    harga: 300,
    hargaFormatted: "Rp 300",
    satuan: "per ekor (ukuran 5-7cm)",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    nama: "Ikan Nila Merah Konsumsi",
    kategori: "perikanan",
    deskripsi: "Ikan nila merah segar langsung dari kolam pembesaran Desa Gumiwang. Daging tebal, gurih, dan tidak berbau lumpur.",
    harga: 32000,
    hargaFormatted: "Rp 32.000",
    satuan: "per kg",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    nama: "Abon Lele Premium",
    kategori: "umkm",
    deskripsi: "Olahan inovatif dari ikan lele segar yang diubah menjadi abon gurih dan tahan lama. Kaya protein dan cocok untuk lauk praktis keluarga.",
    harga: 25000,
    hargaFormatted: "Rp 25.000",
    satuan: "per bungkus (100gr)",
    image: "https://images.unsplash.com/photo-1621287955519-74e2d31bc40c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    nama: "Keripik Singkong Gurih",
    kategori: "umkm",
    deskripsi: "Camilan keripik singkong renyah hasil produksi Kelompok Wanita Tani (KWT). Dibuat dari singkong pilihan dengan bumbu rempah alami.",
    harga: 10000,
    hargaFormatted: "Rp 10.000",
    satuan: "per bungkus (250gr)",
    image: "https://images.unsplash.com/photo-1621287955519-74e2d31bc40c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    nama: "Nugget Ikan Lele",
    kategori: "umkm",
    deskripsi: "Nugget sehat berbahan dasar daging ikan lele segar. Disukai anak-anak dan menjadi alternatif lauk bergizi tanpa bahan pengawet.",
    harga: 20000,
    hargaFormatted: "Rp 20.000",
    satuan: "per pack (300gr)",
    image: "https://images.unsplash.com/photo-1569691105775-4fc9bd7d58a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    nama: "Kerajinan Anyaman Bambu",
    kategori: "umkm",
    deskripsi: "Produk anyaman bambu bernilai seni tinggi buatan pengrajin desa, seperti besek hias, tempat buah, dan tudung saji ramah lingkungan.",
    harga: 35000,
    hargaFormatted: "Rp 35.000",
    satuan: "per buah",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    nama: "Keripik Tempe Mendoan Khas",
    kategori: "umkm",
    deskripsi: "Tempe krispi khas Banjarnegara dengan bumbu ketumbar dan daun bawang segar. Renyah dan lezat sebagai teman makan.",
    harga: 12000,
    hargaFormatted: "Rp 12.000",
    satuan: "per bungkus (200gr)",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    nama: "Ikan Gurame Segar",
    kategori: "perikanan",
    deskripsi: "Ikan gurame hasil budidaya air bersih pedesaan. Daging manis dan tebal, sangat disukai untuk olahan bakar atau goreng.",
    harga: 45000,
    hargaFormatted: "Rp 45.000",
    satuan: "per kg",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    nama: "Pupuk Organik Bio-Kompos",
    kategori: "pertanian",
    deskripsi: "Pupuk komposer organik dari limbah jerami dan kotoran ternak desa. Menyuburkan tanah dan menjaga mikroorganisme alami.",
    harga: 20000,
    hargaFormatted: "Rp 20.000",
    satuan: "per karung (10kg)",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    nama: "Sirup Jahe Merah Herbal",
    kategori: "umkm",
    deskripsi: "Minuman olahan jahe merah alami hasil tanaman warga. Memberikan rasa hangat, menyehatkan tubuh dan meningkatkan imun.",
    harga: 18000,
    hargaFormatted: "Rp 18.000",
    satuan: "per botol (250ml)",
    image: "https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=800&q=80"
  }
];

function Komoditas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const kategori = searchParams.get('kategori') || 'semua';

  const [komoditas, setKomoditas] = useState(DEFAULT_KOMODITAS_LIST);
  const [desa, setDesa] = useState(null);
  const [loading, setLoading] = useState(true);

  const filterOptions = [
    { value: 'semua', label: 'Semua Komoditas' },
    { value: 'pertanian', label: '🌾 Pertanian' },
    { value: 'perikanan', label: '🐟 Perikanan' },
    { value: 'umkm', label: '📦 UMKM' }
  ];

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const url = kategori === 'semua' ? '/api/komoditas' : `/api/komoditas?kategori=${kategori}`;
        const [komoditasRes, desaRes] = await Promise.all([
          fetch(url),
          fetch('/api/desa')
        ]);
        
        if (komoditasRes.ok) {
          const komoditasData = await komoditasRes.json();
          if (komoditasData.data && komoditasData.data.length > 0) {
            setKomoditas(komoditasData.data);
          }
        }
        if (desaRes.ok) {
          const desaData = await desaRes.json();
          setDesa(desaData.data || null);
        }
      } catch (err) {
        console.error('Error fetching komoditas:', err);
      }
      
      // Fallback filter
      if (kategori !== 'semua') {
        setKomoditas(DEFAULT_KOMODITAS_LIST.filter(item => item.kategori.toLowerCase() === kategori.toLowerCase()));
      } else {
        setKomoditas(DEFAULT_KOMODITAS_LIST);
      }
      setLoading(false);
    }
    fetchData();
  }, [kategori]);

  const handleFilterChange = (id) => {
    if (id === 'semua') {
      setSearchParams({});
    } else {
      setSearchParams({ kategori: id });
    }
  };

  return (
    <div className="page-komoditas">
      <HeroSection
        compact
        subtitle="Hasil Bumi & Kreasi Desa"
        title="Komoditas Unggulan"
        description="Jelajahi produk pertanian organik, perikanan budidaya, dan aneka olahan UMKM dari Desa Gumiwang."
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light">
        <div className="container">
          <KategoriFilter
            categories={filterOptions}
            activeCategory={kategori}
            onCategoryChange={handleFilterChange}
          />

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : komoditas.length === 0 ? (
            <div className="empty-state fade-in">
              <h3>Belum ada komoditas di kategori ini</h3>
              <p>Silakan pilih kategori lain.</p>
            </div>
          ) : (
            <div className="komoditas-grid">
              {komoditas.map((item, idx) => (
                <div key={item.id} className={`fade-in fade-in-delay-${idx % 3}`}>
                  <KomoditasCard 
                    item={item} 
                    whatsappNumber={desa?.kontak?.whatsapp || "6281234567890"} 
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Komoditas;
