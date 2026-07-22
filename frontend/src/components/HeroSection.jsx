import { Link } from 'react-router-dom';
import './HeroSection.css';

function HeroSection({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink,
  compact = false,
  image = "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1920&q=80",
  showSearch = false,
}) {
  return (
    <section className={`hero-improvised ${compact ? 'hero-compact' : ''}`}>
      <div className="hero-new__bg">
        <img src={image} alt="Hero Background" />
        <div className="hero-new__overlay gradient-overlay"></div>
      </div>
      <div className="container hero-container-alt">
        <div className="hero-content-left fade-in">
          {subtitle && <span className="hero-new__label">{subtitle}</span>}
          <h1 className="hero-new__title">{title}</h1>
          {description && <p className="hero-new__subtitle">{description}</p>}
          
          {showSearch && (
            <div className="hero-search-pill glass-card">
              <div className="search-pill-field">
                <span className="icon">📍</span>
                <span>Cari Destinasi...</span>
              </div>
              <button className="btn btn-brand search-btn-round">Cari</button>
            </div>
          )}

          {(ctaText || secondaryCtaText) && !showSearch && (
            <div className="hero__actions">
              {ctaText && ctaLink && (
                <Link to={ctaLink} className="btn btn-brand btn-lg">
                  {ctaText} →
                </Link>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Link to={secondaryCtaLink} className="btn btn-secondary btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}>
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
