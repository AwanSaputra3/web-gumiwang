import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/profil', label: 'Profil' },
    { path: '/komoditas', label: 'Komoditas' },
    { path: '/wisata', label: 'Wisata' },
    { path: '/peta', label: 'Peta' },
    { path: '/galeri', label: 'Galeri' },
    { path: '/berita', label: 'Berita' },
    { path: '/kontak', label: 'Kontak' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__container container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-icon">🌿</span>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">Website Desa</span>
            <span className="navbar__brand-sub">Gumiwang</span>
          </div>
        </Link>

        <div className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          id="navbar-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="navbar__overlay" onClick={() => setIsMenuOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;
