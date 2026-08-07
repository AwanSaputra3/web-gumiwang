import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import WisataCard from '../components/WisataCard.jsx';
import './Wisata.css';

const DEFAULT_WISATA_LIST = [];

function Wisata() {
  const [wisataList, setWisataList] = useState(DEFAULT_WISATA_LIST);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWisata() {
      setLoading(true);
      try {
        const res = await fetch('/api/wisata');
        if (res.ok) {
          const data = await res.json();
          setWisataList(data.data || []);
        }
      } catch (err) {
        console.error('Error fetching wisata:', err);
        setWisataList([]);
      }
      setLoading(false);
    }
    fetchWisata();
  }, []);

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
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <span className="loading-text">Memuat data wisata...</span>
            </div>
          ) : wisataList.length === 0 ? (
            <div className="wisata-empty">
              <span className="wisata-empty__icon">🔍</span>
              <h3>Tidak ada wisata ditemukan</h3>
              <p>Saat ini belum ada data destinasi wisata.</p>
            </div>
          ) : (
            <>
              <p className="wisata-count">
                Menampilkan <strong>{wisataList.length}</strong> destinasi wisata
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
