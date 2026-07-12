import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './Berita.css';

function Berita() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBerita() {
      try {
        const res = await fetch('/api/berita');
        const data = await res.json();
        setBerita(data.data || []);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBerita();
  }, []);

  return (
    <div className="page-berita">
      <HeroSection
        compact
        subtitle="Kabar Desa"
        title="Berita & Artikel"
        description="Ikuti perkembangan terbaru, pengumuman, dan artikel informatif dari Desa Gumiwang."
      />

      <section className="section bg-light">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="berita-list">
              {berita.map((item, idx) => (
                <article key={item.id} className={`berita-card glass-card fade-in fade-in-delay-${idx % 3}`}>
                  {item.image && (
                    <div className="berita-card__image" style={{ height: '200px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)' }}></div>
                  )}
                  <div className="berita-card__content">
                    <div className="berita-card__meta">
                      <span className="berita-card__category">{item.kategori}</span>
                      <span className="berita-card__date">📅 {item.tanggal}</span>
                    </div>
                    <h3 className="berita-card__title">{item.judul}</h3>
                    <p className="berita-card__summary">{item.ringkasan}</p>
                    <p className="berita-card__fulltext" style={{ display: 'none' }}>{item.isiLengkap}</p>
                    <button 
                      className="btn btn-outline" 
                      onClick={(e) => {
                        const fullText = e.target.previousElementSibling;
                        const summary = fullText.previousElementSibling;
                        if (fullText.style.display === 'none') {
                          fullText.style.display = 'block';
                          summary.style.display = 'none';
                          e.target.innerText = 'Tutup';
                        } else {
                          fullText.style.display = 'none';
                          summary.style.display = 'block';
                          e.target.innerText = 'Baca Selengkapnya →';
                        }
                      }}
                    >
                      Baca Selengkapnya →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Berita;
