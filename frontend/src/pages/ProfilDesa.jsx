import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './ProfilDesa.css';

function ProfilDesa() {
  const [desa, setDesa] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesa() {
      try {
        const res = await fetch('/api/desa');
        const data = await res.json();
        setDesa(data.data || null);
      } catch (err) {
        console.error('Error:', err);
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
        description={`${desa?.kecamatan}, ${desa?.kabupaten}, ${desa?.provinsi}`}
      />

      {/* Intro & Sejarah */}
      <section className="section">
        <div className="container">
          <div className="profil-intro fade-in">
            <div className="profil-intro__text">
              <span className="section-label">Tentang Kami</span>
              <h2 className="section-title">Sejarah & Perkembangan</h2>
              <p className="profil-intro__desc">{desa?.deskripsi}</p>
              <div className="profil-sejarah">
                <div className="profil-sejarah__icon">📜</div>
                <p>{desa?.sejarah}</p>
              </div>
            </div>

            {/* Demografi Card */}
            <div className="profil-demografi">
              <div className="profil-demografi__card glass-card">
                <h3>Data Demografi</h3>
                <div className="demografi-list">
                  <div className="demografi-item">
                    <span className="demografi-icon">📏</span>
                    <div>
                      <strong>{desa?.demografi?.luasWilayah}</strong>
                      <span>Luas Wilayah</span>
                    </div>
                  </div>
                  <div className="demografi-item">
                    <span className="demografi-icon">👥</span>
                    <div>
                      <strong>{desa?.demografi?.jumlahPenduduk}</strong>
                      <span>Jumlah Penduduk</span>
                    </div>
                  </div>
                  <div className="demografi-item">
                    <span className="demografi-icon">🏠</span>
                    <div>
                      <strong>{desa?.demografi?.jumlahKK}</strong>
                      <span>Kepala Keluarga</span>
                    </div>
                  </div>
                  <div className="demografi-item">
                    <span className="demografi-icon">👨‍🌾</span>
                    <div>
                      <strong>{desa?.demografi?.pekerjaanUtama}</strong>
                      <span>Mata Pencaharian Utama</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visi Misi */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Arah Pembangunan</span>
            <h2 className="section-title">Visi & Misi</h2>
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
