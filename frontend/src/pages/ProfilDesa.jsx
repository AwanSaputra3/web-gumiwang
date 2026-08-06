import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './ProfilDesa.css';

const DEFAULT_DESA_DATA = {};

function ProfilDesa() {
  const [desa, setDesa] = useState(DEFAULT_DESA_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesa() {
      try {
        const res = await fetch('/api/desa');
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setDesa(data.data[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching desa data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchDesa();
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{ minHeight: '100vh' }}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="page-profil">
      <HeroSection
        compact
        subtitle="Mengenal Lebih Dekat"
        title="Profil Desa Gumiwang"
        description={desa?.alamatLengkap || "Desa Gumiwang, Banjarnegara, Jawa Tengah"}
        image="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Intro & Sejarah */}
      <section className="section">
        <div className="container">
          <div className="profil-intro fade-in">
            <div className="profil-intro__text">
              <span className="cursive-label" style={{display: 'block', marginBottom: '10px', transform: 'none'}}>Tentang Kami</span>
              <h2 className="main-title" style={{marginBottom: '20px'}}>Sejarah & Perkembangan</h2>
              <p className="profil-intro__desc">{desa?.deskripsi}</p>
              <div className="profil-sejarah">
                <div className="profil-sejarah__icon">📜</div>
                {Array.isArray(desa?.sejarah) ? (
                  desa.sejarah.map((para, idx) => (
                    <p key={idx} style={{ marginBottom: idx < desa.sejarah.length - 1 ? '1rem' : 0 }}>
                      {para}
                    </p>
                  ))
                ) : (
                  <p>{desa?.sejarah}</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header-alt" style={{ textAlign: 'center' }}>
            <span className="cursive-label" style={{display: 'block', marginBottom: '10px', transform: 'none'}}>Arah Pembangunan</span>
            <h2 className="main-title">Visi & Misi</h2>
            <p className="section-subtitle">
              Tujuan dan langkah konkrit yang diambil Pemerintah Desa Gumiwang.
            </p>
          </div>

          <div className="profil-visimisi fade-in">
            <div className="profil-visi glass-card">
              <div className="profil-visi__icon">🎯</div>
              <h3>Visi</h3>
              <p>{desa?.visiMisi?.visi}</p>
            </div>

            <div className="profil-misi glass-card">
              <div className="profil-misi__icon">🚀</div>
              <h3>Misi</h3>
              <ol className="profil-misi__list">
                {desa?.visiMisi?.misi?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProfilDesa;
