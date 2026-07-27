import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection.jsx';
import './Berita.css';

const DEFAULT_BERITA_LIST = [
  {
    id: 1,
    judul: "Panen Raya Lele Sukses Digelar",
    slug: "panen-raya-lele-sukses",
    ringkasan: "Kelompok pembudidaya ikan Desa Gumiwang berhasil melakukan panen raya lele dengan total hasil mencapai 5 ton dalam satu siklus.",
    isiLengkap: "Pada hari Minggu lalu, kelompok pembudidaya ikan (Pokdakan) Desa Gumiwang melaksanakan panen raya ikan lele. Kegiatan ini dihadiri oleh Kepala Desa dan perwakilan dari Dinas Perikanan Kabupaten Banjarnegara. Total hasil panen mencapai 5 ton yang dipelihara dengan sistem bioflok selama 3 bulan. Keberhasilan ini diharapkan dapat memotivasi warga lain untuk ikut membudidayakan ikan air tawar guna meningkatkan ekonomi keluarga.",
    tanggal: "20 Oktober 2025",
    kategori: "Perikanan",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    judul: "Desa Gumiwang Kembangkan Beras Organik",
    slug: "gumiwang-kembangkan-beras-organik",
    ringkasan: "Dalam upaya mewujudkan pertanian berkelanjutan, gabungan kelompok tani mulai menerapkan sistem pertanian organik untuk tanaman padi.",
    isiLengkap: "Mulai musim tanam tahun ini, Gabungan Kelompok Tani (Gapoktan) Desa Gumiwang telah mengalokasikan 10 hektar lahan sawah khusus untuk pengembangan beras organik. Penggunaan pupuk kimia mulai dikurangi drastis dan digantikan dengan pupuk kompos serta pestisida nabati buatan sendiri. Langkah ini diambil untuk menjaga kesuburan tanah sekaligus memenuhi permintaan pasar akan bahan pangan sehat dan bebas residu kimia.",
    tanggal: "12 November 2025",
    kategori: "Pertanian",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    judul: "Pelatihan Olahan Hasil Ikan untuk KWT",
    slug: "pelatihan-olahan-hasil-ikan",
    ringkasan: "Kelompok Wanita Tani (KWT) mendapatkan pelatihan pembuatan abon dan nugget dari bahan dasar ikan lele.",
    isiLengkap: "Untuk meningkatkan nilai jual hasil perikanan, Pemerintah Desa Gumiwang menyelenggarakan pelatihan pengolahan hasil ikan bagi Kelompok Wanita Tani (KWT). Berlokasi di balai desa, para peserta diajarkan cara membuat abon lele, nugget, dan kerupuk tulang lele. Produk-produk ini diharapkan tidak hanya untuk konsumsi sendiri, tetapi juga bisa dipasarkan sebagai produk unggulan UMKM Desa Gumiwang.",
    tanggal: "05 Desember 2025",
    kategori: "UMKM",
    image: "https://images.unsplash.com/photo-1582285516943-34e8be3426cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    judul: "Peresmian Destinasi Wisata Tubing Sungai Gumiwang",
    slug: "peresmian-wisata-tubing",
    ringkasan: "Pemerintah Desa Gumiwang meresmikan wahana wisata baru susur sungai tubing yang menyajikan wahana petualangan alam seru.",
    isiLengkap: "Pemerintah Desa Gumiwang resmi membuka destinasi wisata anyar berupa Tubing Sungai Gumiwang. Peresmian dihadiri oleh Pokdarwis desa dan perwakilan Dinas Pariwisata Banjarnegara. Wahana ini menyuguhkan petualangan air menyusuri sungai jernih sepanjang 2 km dengan peralatan keselamatan standar internasional dan instruktur bersertifikasi.",
    tanggal: "15 Januari 2026",
    kategori: "Pariwisata",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    judul: "Desa Gumiwang Raih Penghargaan Desa Digital Terbaik",
    slug: "gumiwang-raih-penghargaan-desa-digital",
    ringkasan: "Inovasi sistem informasi wisata dan pemasaran komoditas digital membawa Desa Gumiwang memenangkan penghargaan tingkat kabupaten.",
    isiLengkap: "Desa Gumiwang dianugerahi penghargaan Desa Digital Terbaik tingkat Kabupaten Banjarnegara. Penghargaan ini diraih berkat integrasi platform digital untuk promosi tempat wisata, edukasi perikanan, serta katalog UMKM online yang memudahkan wisatawan dan pembeli mengakses informasi desa secara transparan dan cepat.",
    tanggal: "02 Februari 2026",
    kategori: "Prestasi",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    judul: "Peluncuran Program Usaha Ternak Bioflok Ekspor",
    slug: "peluncuran-ternak-bioflok-ekspor",
    ringkasan: "Kolaborasi kelompok peternak lokal dan akademisi meluncurkan standarisasi budidaya lele bioflok berskala mutu tinggi.",
    isiLengkap: "Pemerintah Desa Gumiwang bekerja sama dengan universitas negeri meresmikan fasilitas pendampingan teknologi bioflok berstandar ekspor. Melalui kolaborasi ini, kualitas pakan, sirkulasi air, dan kesehatan lele dipantau secara digital sehingga produktivitas meningkat hingga 40% dan membuka peluang rantai pasok ke supermarket nasional.",
    tanggal: "20 Februari 2026",
    kategori: "Perikanan",
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&w=800&q=80"
  }
];

function Berita() {
  const [berita, setBerita] = useState(DEFAULT_BERITA_LIST);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBerita() {
      try {
        const res = await fetch('/api/berita');
        if (res.ok) {
          const data = await res.json();
          if (data.data && data.data.length > 0) {
            setBerita(data.data);
          }
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBerita();
  }, []);

  return (
    <div className="page-berita">
      <HeroSection
        compact
        subtitle="Kabar Desa"
        title="Berita & Artikel"
        description="Ikuti perkembangan terbaru, pengumuman, dan artikel informatif dari Desa Gumiwang."
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-light">
        <div className="container">
          {loading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
            </div>
          ) : (
            <div className="berita-list">
              {berita.map((item, idx) => (
                <article key={item.id} className={`berita-card glass-card fade-in fade-in-delay-${idx % 3}`}>
                  {item.image && (
                    <div className="berita-card__image" style={{ height: '200px', backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderTopLeftRadius: 'var(--radius-xl)', borderTopRightRadius: 'var(--radius-xl)' }}></div>
                  )}
                  <div className="berita-card__content">
                    <div className="berita-card__meta">
                      <span className="berita-card__category">{item.kategori}</span>
                      <span className="berita-card__date">📅 {item.tanggal}</span>
                    </div>
                    <h3 className="berita-card__title">{item.judul}</h3>
                    <p className="berita-card__summary">{item.ringkasan}</p>
                    <p className="berita-card__fulltext" style={{ display: 'none' }}>{item.isiLengkap}</p>
                    <button 
                      className="btn btn-outline" 
                      onClick={(e) => {
                        const fullText = e.target.previousElementSibling;
                        const summary = fullText.previousElementSibling;
                        if (fullText.style.display === 'none') {
                          fullText.style.display = 'block';
                          summary.style.display = 'none';
                          e.target.innerText = 'Tutup';
                        } else {
                          fullText.style.display = 'none';
                          summary.style.display = 'block';
                          e.target.innerText = 'Baca Selengkapnya →';
                        }
                      }}
                    >
                      Baca Selengkapnya →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Berita;
