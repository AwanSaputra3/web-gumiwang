import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './ProfilDesa.css';

const DEFAULT_DESA_DATA = {
  nama: "Desa Gumiwang",
  kecamatan: "Purwanegara",
  kabupaten: "Banjarnegara",
  provinsi: "Jawa Tengah",
  kodePos: "53472",
  alamatLengkap: "Desa Gumiwang, Kecamatan Purwanegara, Kabupaten Banjarnegara, Jawa Tengah 53472",
  deskripsi: "Desa Gumiwang merupakan desa yang kaya akan potensi sumber daya alam, khususnya pada sektor pertanian dan perikanan. Dikenal dengan sentra perikanan air tawar (terutama lele dan nila) dan hamparan sawah yang subur, desa ini terus bertransformasi menjadi desa yang mandiri dan berdaya saing.",
  sejarah: [
    "Berdasarkan informasi dari para sesepuh Bapak Hadi Suratmo dan Bapak Wartono Desa Gumiwang pada tahun 1930 Desa Gumiwang merupakan desa penggabungan dari dua desa karena ada aturan dari pemerintah bahwa Asisten Wilayah (kecamatan) harus membawahi 13 desa sehingga dalam Kecamatan Purwanegara ada Desa Gumiwang dan Desa Panggang yang mengalami penggabungan menjadi satu Desa yaitu Desa Gumiwang",
    "Desa Gumiwang awalnya mengalami kekosongan dua periode kepala desa, karena kepala desa sudah meninggal dunia yaitu Madsemangun (Alm) namun belum ada pengisian baru. Dimana lokasi kelurahan lama pada saat ini berada di belakang RM Sari Rahayu. Wilayah Desa Gumiwang pada jaman lama adalah utara jalan raya provinsi dengan dukuh Tambor, Gumiwang Lor, Wates, Prapas yang saat ini menjadi wilayah dusun 4 dan dusun 5. Sedangkan Desa Satunya adalah Desa Panggang yang saat itu di pimpin oleh Musawikarta (Alm) dengan wilayah kerja bagian selatan dari jalan raya provinsi yaitu meliputi dukuh Panggang dan Mergayasa.",
    "Dikarenakan adanya penggabungan dua Desa dan salah satu desanya sudah mengalami dua kali kekosongan pemimpin maka Desa Gumiwang dan Desa Panggang di gabung menjadi satu Desa sekitar tahun 1930 yaitu Desa Gumiwang dengan di pimpin oleh Bapak Musawikarta (Alm) dengan Wilayah Kerja Gumiwang Lor, Wates, Prapas, Panggang dan Mergayasa."
  ],
  demografi: {
    luasWilayah: "320 hektar",
    jumlahPenduduk: "4.500 jiwa",
    jumlahKK: "1.200 KK",
    pekerjaanUtama: "Petani dan Peternak Ikan"
  },
  kontak: {
    whatsapp: "6281234567890",
    email: "pemdes@gumiwang.desa.id",
    instagram: "@desagumiwang",
    facebook: "Pemdes Gumiwang",
    alamat: "Kantor Kepala Desa Gumiwang, Jl. Raya Gumiwang No.1, Banjarnegara"
  },
  visiMisi: {
    visi: "Terwujudnya Tata Kelola Pemerintahan Desa yang Baik & Profesional untuk Mewujudkan Desa Gumiwang yang Maju, Makmur dan Sejahtera",
    misi: [
      "Meningkatkan Pembangunan Infrastruktur Berupa Jalan Desa, Prasarana Air Bersih dan Irigasi",
      "Optimalisasi Peran Aparatur Pemerintahan Desa dalam Pelayanan Kepada Masyarakat yang Lebih Profesional",
      "Pemberdayaan Sumber Daya Manusia, Sumber Daya Alam dan Semua Potensi yang ada di Masyarakat dalam bidang Peternakan, Perikanan, Pertanian dan UMKM guna Meningkatkan Kesejahteraan Warga Desa Gumiwang",
      "Mengedepankan Partisipasi Masyarakat dalam Melaksanakan Perencanaan dan Pelaksanaan Pembangunan",
      "Mengoptimalisasikan Fungsi Lembaga Desa sebagai Mitra Pemerintah Desa dalam Perencanaan, Pelaksanaan, dan Pengawasan Pembangunan Desa"
    ]
  }
};

function ProfilDesa() {
  const [desa, setDesa] = useState(DEFAULT_DESA_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesa() {
      try {
        const res = await fetch('/api/desa');
        if (res.ok) {
          const data = await res.json();
          if (data.data) {
            setDesa(data.data);
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
