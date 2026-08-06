import { Link } from 'react-router-dom';
import './KomoditasCard.css';

function KomoditasCard({ item, whatsappNumber }) {
  const getIcon = () => {
    switch (item.kategori) {
      case 'pertanian': return '🌾';
      case 'perikanan': return '🐟';
      case 'umkm': return '📦';
      default: return '🛍️';
    }
  };

  const handleWhatsApp = () => {
    const waNumber = item.whatsapp || whatsappNumber;
    if (!waNumber) {
      alert("Nomor WhatsApp admin belum tersedia.");
      return;
    }
    const message = `Halo Admin Desa Gumiwang, saya tertarik dengan produk komoditas *${item.nama}* (${item.hargaFormatted}/${item.satuan}). Apakah masih tersedia?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className={`komoditas-card-item komoditas-card-item--${item.kategori}`}>
      {item.image ? (
        <div className="komoditas-card-item__image" style={{ height: '200px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
          <span className="komoditas-card-item__badge" style={{ position: 'absolute', top: '16px', right: '16px' }}>{item.kategori}</span>
        </div>
      ) : (
        <div className="komoditas-card-item__header">
          <span className="komoditas-card-item__icon">{getIcon()}</span>
          <span className="komoditas-card-item__badge">{item.kategori}</span>
        </div>
      )}
      
      <div className="komoditas-card-item__body">
        <h3 className="komoditas-card-item__title">{item.nama}</h3>
        <p className="komoditas-card-item__desc">{item.deskripsi}</p>
        
        <div className="komoditas-card-item__price">
          <strong>{item.hargaFormatted}</strong>
          <span>/{item.satuan}</span>
        </div>
      </div>
      
      <div className="komoditas-card-item__footer" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link 
          to={`/komoditas/${item.id}`} 
          className="btn-whatsapp" 
          style={{ background: 'var(--color-primary)', color: 'black', display: 'flex', justifyContent: 'center', textDecoration: 'none' }}
        >
          Lihat Detail Produk
        </Link>
      </div>
    </div>
  );
}

export default KomoditasCard;
