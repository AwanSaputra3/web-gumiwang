import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import '../../components/admin/GenericCrud.css';

const DEFAULT_HOME_DATA = {
  hero: {
    title: "Eksplorasi<br/>Pesona Alam",
    subtitle: "Selamat Datang di Gumiwang, tempat dimana tradisi dan alam menyatu harmoni.",
    image: "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&w=1920&q=80"
  },
  keajaiban: {
    title: "Keajaiban Desa Kami",
    subtitle: "Temukan spot-spot menakjubkan yang belum pernah Anda kunjungi.",
    items: [
      { title: "Terasering Sawah Hijau", desc: "Nikmati pemandangan sawah berundak yang memanjakan mata.", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80" },
      { title: "Perikanan Bioflok", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80" },
      { title: "Kebun Hidroponik", image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=600&q=80" },
      { title: "Kesenian Lokal", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80" },
      { title: "Pusat Oleh-Oleh", image: "https://images.unsplash.com/photo-1621287955519-74e2d31bc40c?auto=format&fit=crop&w=800&q=80" }
    ]
  },
  keunggulan: {
    title: "Mengapa Berkunjung ke Deswita Gumiwang?",
    subtitle: "Nikmati pengalaman berwisata otentik dengan beragam fasilitas dan keasrian alam yang memikat.",
    items: [
      { icon: "🌱", title: "Alam Asri & Sejuk", desc: "Dikelilingi pemandangan persawahan berundak dan udara pedesaan yang bebas dari polusi kota." },
      { icon: "🎭", title: "Kebudayaan Otentik", desc: "Rasakan hangatnya kearifan lokal, pertunjukan seni tradisional, serta keramahan warga desa." },
      { icon: "🐟", title: "Eduwisata Komprehensif", desc: "Program edukasi perikanan bioflok, pertanian hidroponik, dan olahan pangan khas untuk segala usia." },
      { icon: "🏡", title: "Fasilitas Nyaman", desc: "Tersedia homestay warga yang bersih, area parkir luas, tempat ibadah, serta kuliner lokal lezat." }
    ]
  },
  statistik: [
    { number: "15+", label: "Spot Wisata" },
    { number: "1.2k+", label: "Pengunjung / Bulan" },
    { number: "25+", label: "UMKM Lokal" },
    { number: "100%", label: "Ramah Lingkungan" }
  ],
  video: {
    title: "Saksikan Keindahan Gumiwang",
    subtitle: "Jelajahi keasrian desa, keramahan warga, dan kekayaan budaya yang kami tawarkan melalui dokumenter eksklusif ini.",
    youtubeUrl: ""
  },
  mitra: [
    "Dinas Pariwisata", "Kemenparekraf", "Universitas Lokal", "Pokdarwis"
  ]
};

const KelolaHome = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settingId, setSettingId] = useState(null);
  
  const [formData, setFormData] = useState(DEFAULT_HOME_DATA);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/settings');
      if (response.data.success) {
        const homeSetting = response.data.data.find(s => s.key === 'home');
        if (homeSetting) {
          setSettingId(homeSetting.id);
          try {
            const parsedValue = JSON.parse(homeSetting.value);
            // Merge with default to ensure all fields exist
            setFormData({
              ...DEFAULT_HOME_DATA,
              ...parsedValue,
              keajaiban: {
                ...DEFAULT_HOME_DATA.keajaiban,
                ...(parsedValue.keajaiban || {}),
                items: parsedValue.keajaiban?.items?.length === 5 ? parsedValue.keajaiban.items : DEFAULT_HOME_DATA.keajaiban.items
              },
              keunggulan: {
                ...DEFAULT_HOME_DATA.keunggulan,
                ...(parsedValue.keunggulan || {}),
                items: parsedValue.keunggulan?.items?.length === 4 ? parsedValue.keunggulan.items : DEFAULT_HOME_DATA.keunggulan.items
              },
              statistik: parsedValue.statistik?.length === 4 ? parsedValue.statistik : DEFAULT_HOME_DATA.statistik,
              mitra: parsedValue.mitra?.length === 4 ? parsedValue.mitra : DEFAULT_HOME_DATA.mitra
            });
          } catch (e) {
            console.error("Error parsing home JSON", e);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, hero: { ...prev.hero, [name]: value } }));
  };

  const handleKeajaibanChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, keajaiban: { ...prev.keajaiban, [name]: value } }));
  };

  const handleKeajaibanItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.keajaiban.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, keajaiban: { ...prev.keajaiban, items: newItems } };
    });
  };

  const handleKeunggulanChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, keunggulan: { ...prev.keunggulan, [name]: value } }));
  };

  const handleKeunggulanItemChange = (index, field, value) => {
    setFormData(prev => {
      const newItems = [...prev.keunggulan.items];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, keunggulan: { ...prev.keunggulan, items: newItems } };
    });
  };

  const handleStatistikChange = (index, field, value) => {
    setFormData(prev => {
      const newStats = [...prev.statistik];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, statistik: newStats };
    });
  };

  const handleVideoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, video: { ...prev.video, [name]: value } }));
  };

  const handleMitraChange = (index, value) => {
    setFormData(prev => {
      const newMitra = [...prev.mitra];
      newMitra[index] = value;
      return { ...prev, mitra: newMitra };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const payload = {
        key: 'home',
        value: JSON.stringify(formData)
      };

      let response;
      if (settingId) {
        response = await api.put(`/admin/settings/${settingId}`, payload);
      } else {
        response = await api.post(`/admin/settings`, payload);
      }

      if (response.data.success) {
        alert("Berhasil menyimpan pengaturan Home!");
        if (!settingId) setSettingId(response.data.data.id);
      } else {
        alert("Gagal menyimpan pengaturan.");
      }
    } catch (error) {
      console.error("Error saving:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="crud-container"><p>Loading data...</p></div>;
  }

  return (
    <div className="crud-container" style={{ paddingBottom: '40px' }}>
      <div className="crud-header">
        <h2>Kelola Teks & Konten Home</h2>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit} className="crud-form">
          
          {/* Hero Section */}
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '10px' }}>1. Hero (Paling Atas)</h3>
          <div className="form-group">
            <label>Judul Hero (gunakan &lt;br/&gt; untuk baris baru)</label>
            <input type="text" name="title" value={formData.hero.title} onChange={handleHeroChange} required />
          </div>
          <div className="form-group">
            <label>Subjudul Hero</label>
            <textarea name="subtitle" value={formData.hero.subtitle} onChange={handleHeroChange} rows="2" required></textarea>
          </div>
          <div className="form-group">
            <label>Link Gambar Latar (Background)</label>
            <input type="text" name="image" value={formData.hero.image} onChange={handleHeroChange} required />
          </div>

          {/* Keajaiban Desa Section */}
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>2. Bagian Keajaiban Desa</h3>
          <div className="form-group">
            <label>Judul Bagian</label>
            <input type="text" name="title" value={formData.keajaiban.title} onChange={handleKeajaibanChange} required />
          </div>
          <div className="form-group">
            <label>Subjudul Bagian</label>
            <textarea name="subtitle" value={formData.keajaiban.subtitle} onChange={handleKeajaibanChange} rows="2" required></textarea>
          </div>
          
          <h4 style={{marginTop: '20px'}}>Foto & Destinasi Keajaiban</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
            {formData.keajaiban.items.map((item, index) => (
              <div key={index} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                <h5 style={{ margin: '0 0 10px 0' }}>{index === 0 ? 'Item Utama (Besar)' : `Sub Item ${index}`}</h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label>Judul Teks</label>
                    <input type="text" value={item.title} onChange={(e) => handleKeajaibanItemChange(index, 'title', e.target.value)} required />
                  </div>
                  <div className="form-group" style={{ marginBottom: '10px' }}>
                    <label>Link Gambar URL</label>
                    <input type="text" value={item.image} onChange={(e) => handleKeajaibanItemChange(index, 'image', e.target.value)} required />
                  </div>
                </div>
                {index === 0 && (
                  <div className="form-group" style={{ marginBottom: '0' }}>
                    <label>Deskripsi (Hanya untuk item utama)</label>
                    <textarea value={item.desc || ''} onChange={(e) => handleKeajaibanItemChange(index, 'desc', e.target.value)} rows="2" required></textarea>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Keunggulan Section */}
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>3. Bagian Keunggulan Desa</h3>
          <div className="form-group">
            <label>Judul Utama Keunggulan</label>
            <input type="text" name="title" value={formData.keunggulan.title} onChange={handleKeunggulanChange} required />
          </div>
          <div className="form-group">
            <label>Subjudul Keunggulan</label>
            <textarea name="subtitle" value={formData.keunggulan.subtitle} onChange={handleKeunggulanChange} rows="2" required></textarea>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            {formData.keunggulan.items.map((item, index) => (
              <div key={index} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Item Keunggulan {index + 1}</h4>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <label>Ikon (Emoji / Teks)</label>
                  <input type="text" value={item.icon} onChange={(e) => handleKeunggulanItemChange(index, 'icon', e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <label>Judul Item</label>
                  <input type="text" value={item.title} onChange={(e) => handleKeunggulanItemChange(index, 'title', e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label>Deskripsi Item</label>
                  <textarea value={item.desc} onChange={(e) => handleKeunggulanItemChange(index, 'desc', e.target.value)} rows="2" required></textarea>
                </div>
              </div>
            ))}
          </div>

          {/* Statistik Section */}
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>4. Bagian Statistik</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            {formData.statistik.map((stat, index) => (
              <div key={index} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>Statistik {index + 1}</h4>
                <div className="form-group" style={{ marginBottom: '10px' }}>
                  <label>Angka (Misal: 15+)</label>
                  <input type="text" value={stat.number} onChange={(e) => handleStatistikChange(index, 'number', e.target.value)} required />
                </div>
                <div className="form-group" style={{ marginBottom: '0' }}>
                  <label>Label Teks</label>
                  <input type="text" value={stat.label} onChange={(e) => handleStatistikChange(index, 'label', e.target.value)} required />
                </div>
              </div>
            ))}
          </div>

          {/* Video / Cerita Kami */}
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>5. Bagian Cerita Kami (Video)</h3>
          <div className="form-group">
            <label>Judul Cerita</label>
            <input type="text" name="title" value={formData.video.title} onChange={handleVideoChange} required />
          </div>
          <div className="form-group">
            <label>Deskripsi Cerita</label>
            <textarea name="subtitle" value={formData.video.subtitle} onChange={handleVideoChange} rows="2" required></textarea>
          </div>
          <div className="form-group">
            <label>Link YouTube (opsional)</label>
            <input type="text" name="youtubeUrl" value={formData.video.youtubeUrl || ''} onChange={handleVideoChange} placeholder="Contoh: https://www.youtube.com/watch?v=..." />
          </div>

          {/* Mitra */}
          <h3 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px', marginTop: '30px' }}>6. Mitra / Didukung Oleh</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            {formData.mitra.map((mitraName, index) => (
              <div key={index} className="form-group" style={{ marginBottom: '0' }}>
                <label>Nama Lembaga {index + 1}</label>
                <input type="text" value={mitraName} onChange={(e) => handleMitraChange(index, e.target.value)} required />
              </div>
            ))}
          </div>

          <div className="form-actions" style={{ marginTop: '30px', justifyContent: 'flex-start' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KelolaHome;
