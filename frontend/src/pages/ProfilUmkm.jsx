import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import KomoditasCard from '../components/KomoditasCard.jsx';
import './ProfilUmkm.css';

function ProfilUmkm() {
  const { id } = useParams();
  const [umkm, setUmkm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUmkm() {
      try {
        const res = await fetch(`/api/umkm/${id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setUmkm(data.data);
          }
        }
      } catch (err) {
        console.error('Error fetching Profil UMKM:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUmkm();
  }, [id]);

  if (loading) {
    return (
      <div className="profil-umkm-page">
        <div className="loading-container" style={{ minHeight: '80vh' }}>
          <div className="loading-spinner"></div>
          <span className="loading-text">Memuat profil komoditas...</span>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="profil-umkm-page">
        <div className="detail-notfound">
          <span className="detail-notfound__icon">😕</span>
          <h2>Komoditas Tidak Ditemukan</h2>
          <p>Profil komoditas yang Anda cari tidak tersedia.</p>
          <Link to="/umkm" className="btn btn-primary">
            ← Kembali ke Daftar Komoditas
          </Link>
        </div>
      </div>
    );
  }

  const defaultLogo = 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80';
  const displayLogo = umkm.logo || defaultLogo;

  return (
    <div className="profil-umkm-page">
      <div className="container">
        <Link to="/umkm" className="back-link">
          ← Kembali ke Daftar Komoditas
        </Link>
        
        {/* Profile Header */}
        <section className="umkm-profile-header glass-card">
          <div className="umkm-profile-header__logo" style={{ backgroundImage: `url(${displayLogo})` }}></div>
          <div className="umkm-profile-header__info">
            <h1>{umkm.nama}</h1>
            <p className="umkm-profile-header__desc">{umkm.deskripsi || 'Belum ada deskripsi untuk komoditas ini.'}</p>
            {umkm.whatsapp && (
              <a 
                href={`https://wa.me/${umkm.whatsapp}?text=Halo%20${encodeURIComponent(umkm.nama)},%20saya%20melihat%20profil%20Anda%20di%20website%20Desa%20Gumiwang.`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-brand"
              >
                📞 Hubungi via WhatsApp
              </a>
            )}
          </div>
        </section>

        {/* Product List */}
        <section className="umkm-products-section">
          <div className="section-header-alt">
            <h2>Etalase Produk</h2>
            <p>Daftar komoditas dan produk yang ditawarkan oleh {umkm.nama}.</p>
          </div>
          
          {umkm.komoditas && umkm.komoditas.length > 0 ? (
            <div className="komoditas-grid">
              {umkm.komoditas.map((item, idx) => (
                <div key={item.id} className={`fade-in fade-in-delay-${idx % 3}`}>
                  <KomoditasCard item={item} whatsappNumber={umkm.whatsapp} />
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-state-icon">🛒</span>
              <p>Belum ada produk yang ditambahkan ke etalase ini.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ProfilUmkm;
