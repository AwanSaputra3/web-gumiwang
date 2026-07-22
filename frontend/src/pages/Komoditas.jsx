import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import KategoriFilter from '../components/KategoriFilter.jsx';
import KomoditasCard from '../components/KomoditasCard.jsx';
import './Komoditas.css'; // Let's just use a simple grid css

function Komoditas() {
  const [searchParams, setSearchParams] = useSearchParams();
  const kategori = searchParams.get('kategori') || 'semua';

  const [komoditas, setKomoditas] = useState([]);
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
        
        const komoditasData = await komoditasRes.json();
        const desaData = await desaRes.json();
        
        setKomoditas(komoditasData.data || []);
        setDesa(desaData.data || null);
      } catch (err) {
        console.error('Error fetching komoditas:', err);
      } finally {
        setLoading(false);
      }
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
                    whatsappNumber={desa?.kontak?.whatsapp} 
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
