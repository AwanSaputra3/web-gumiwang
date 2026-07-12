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
}) {
  return (
    <section className={`hero ${compact ? 'hero--compact' : ''}`} id="hero-section">
      {/* Decorative Background Elements */}
      <div className="hero__bg">
        <div className="hero__bg-circle hero__bg-circle--1"></div>
        <div className="hero__bg-circle hero__bg-circle--2"></div>
        <div className="hero__bg-circle hero__bg-circle--3"></div>
        <div className="hero__bg-pattern"></div>
      </div>

      <div className="hero__content container">
        {subtitle && (
          <span className="hero__label fade-in">{subtitle}</span>
        )}
        <h1 className="hero__title fade-in fade-in-delay-1">{title}</h1>
        {description && (
          <p className="hero__desc fade-in fade-in-delay-2">{description}</p>
        )}
        {(ctaText || secondaryCtaText) && (
          <div className="hero__actions fade-in fade-in-delay-3">
            {ctaText && ctaLink && (
              <Link to={ctaLink} className="btn btn-accent btn-lg">
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

      {!compact && (
        <div className="hero__scroll-hint fade-in fade-in-delay-4">
          <span>Scroll ke bawah</span>
          <div className="hero__scroll-arrow">↓</div>
        </div>
      )}
    </section>
  );
}

export default HeroSection;
