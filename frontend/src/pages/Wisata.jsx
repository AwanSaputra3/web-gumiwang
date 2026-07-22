import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import WisataCard from '../components/WisataCard.jsx';
import KategoriFilter from '../components/KategoriFilter.jsx';
import './Wisata.css';

const categories = [
  { value: '', label: 'Semua', emoji: '✨' },
  { value: 'alam', label: 'Alam', emoji: '🏔️' },
  { value: 'budaya', label: 'Budaya', emoji: '🎭' },
  { value: 'edukasi', label: 'Edukasi', emoji: '📚' },
];

function Wisata() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [wisataList, setWisataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('kategori') || '');

  useEffect(() => {
    async function fetchWisata() {
      setLoading(true);
      try {
        const url = activeCategory
          ? `/api/wisata?kategori=${activeCategory}`
          : '/api/wisata';
        const res = await fetch(url);
        const data = await res.json();
        setWisataList(data.data || []);
      } catch (err) {
        console.error('Error fetching wisata:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchWisata();
  }, [activeCategory]);

  const handleCategoryChange = (value) => {
    setActiveCategory(value);
    if (value) {
      setSearchParams({ kategori: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="page-wisata">
      <HeroSection
        compact
        subtitle="Eksplorasi Destinasi"
        title="Wisata Desa Gumiwang"
        description="Temukan beragam destinasi wisata alam, budaya, dan edukasi yang menakjubkan."
        image="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section">
        <div className="container">
          <KategoriFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span className="loading-text">Memuat data wisata...</span>
            </div>
          ) : wisataList.length === 0 ? (
            <div className="wisata-empty">
              <span className="wisata-empty__icon">🔍</span>
              <h3>Tidak ada wisata ditemukan</h3>
              <p>Coba pilih kategori lain untuk menemukan wisata yang sesuai.</p>
            </div>
          ) : (
            <>
              <p className="wisata-count">
                Menampilkan <strong>{wisataList.length}</strong> destinasi wisata
                {activeCategory && (
                  <> dalam kategori <strong>{activeCategory}</strong></>
                )}
              </p>
              <div className="wisata-grid">
                {wisataList.map((wisata, idx) => (
                  <WisataCard key={wisata.id} wisata={wisata} index={idx} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Wisata;
