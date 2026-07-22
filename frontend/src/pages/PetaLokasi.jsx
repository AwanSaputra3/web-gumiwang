import HeroSection from '../components/HeroSection.jsx';
import './PetaLokasi.css';

function PetaLokasi() {
  // Koordinat generik untuk Desa Gumiwang, Purwanegara, Banjarnegara
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15822.463124892489!2d109.6105!3d-7.3912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aaef3d395a1c1%3A0x63c32e920d3dfcf0!2sGumiwang%2C%20Kec.%20Purwanegara%2C%20Kab.%20Banjarnegara%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid";

  return (
    <div className="page-peta">
      <HeroSection
        compact
        subtitle="Petunjuk Arah"
        title="Peta Lokasi Gumiwang"
        description="Temukan lokasi Balai Desa Gumiwang dan spot-spot penting lainnya di wilayah kami melalui Google Maps terintegrasi."
        image="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="peta-wrapper glass-card fade-in">
            <div className="peta-info">
              <h3>📍 Pusat Desa Gumiwang</h3>
              <p>
                Kecamatan Purwanegara, Kabupaten Banjarnegara, Jawa Tengah.<br />
                Gunakan peta interaktif di bawah ini untuk melihat rute perjalanan dari lokasi Anda.
              </p>
            </div>
            <div className="peta-embed-container">
              <iframe
                title="Peta Desa Gumiwang"
                src={mapSrc}
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      
      {/* Jarak spacer bawah */}
      <div style={{ height: '4rem', background: 'var(--color-gray-50)' }}></div>
    </div>
  );
}

export default PetaLokasi;
