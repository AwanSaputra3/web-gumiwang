import { Link } from 'react-router-dom';
import './WisataCard.css';

function WisataCard({ wisata, index = 0 }) {
  const kategoriEmoji = {
    alam: '🏔️',
    budaya: '🎭',
    edukasi: '📚',
  };

  return (
    <Link
      to={`/wisata/${wisata.id}`}
      className={`wisata-card glass-card fade-in fade-in-delay-${(index % 4) + 1}`}
      id={`wisata-card-${wisata.id}`}
    >
      <div className="wisata-card__image">
        {wisata.image ? (
          <img src={wisata.image} alt={wisata.nama} className="wisata-card__image-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div className="wisata-card__image-placeholder">
            <span className="wisata-card__image-emoji">
              {kategoriEmoji[wisata.kategori] || '🌿'}
            </span>
          </div>
        )}
        <div className="wisata-card__badge-wrap">
          <span className={`badge badge-${wisata.kategori}`}>
            {kategoriEmoji[wisata.kategori]} {wisata.kategori}
          </span>
        </div>
        {wisata.featured && (
          <span className="wisata-card__featured">⭐ Unggulan</span>
        )}
      </div>

      <div className="wisata-card__body">
        <h3 className="wisata-card__title">{wisata.nama}</h3>
        <p className="wisata-card__desc">{wisata.deskripsiSingkat}</p>

        <div className="wisata-card__footer">
          <div className="wisata-card__price">
            <span className="wisata-card__price-label">Mulai dari</span>
            <span className="wisata-card__price-value">{wisata.hargaFormatted}</span>
          </div>
          <div className="wisata-card__rating">
            <span>⭐</span>
            <span>{wisata.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default WisataCard;
