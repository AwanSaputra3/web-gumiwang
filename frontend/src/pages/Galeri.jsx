import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './Galeri.css';

function Galeri() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGaleri() {
      try {
        const res = await fetch('/api/galeri');
        const data = await res.json();
        setGaleri(data.data || []);
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
