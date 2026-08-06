import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './Berita.css';

const DEFAULT_BERITA_LIST = [];

const getDirectImageUrl = (url) => {
  if (!url) return url;
  const driveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
  }
  return url;
};

function Berita() {
  const [berita, setBerita] = useState(DEFAULT_BERITA_LIST);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBerita() {
      try {
        const res = await fetch('/api/berita');
        if (res.ok) {
          const data = await res.json();
          setBerita(data.data || []);
        }
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
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80"
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
                    <div className="berita-card__image" style={{ borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)', overflow: 'hidden', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={getDirectImageUrl(item.image)} alt={item.judul} style={{ width: '100%', maxHeight: '400px', height: 'auto', objectFit: 'contain' }} onError={(e) => { e.target.style.display = 'none'; }} />
                    </div>
                  )}
                  <div className="berita-card__content">
                    <div className="berita-card__meta">
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
