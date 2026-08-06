import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import '../../components/admin/GenericCrud.css';

const KelolaKontak = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [desaId, setDesaId] = useState(null);
  
  const [formData, setFormData] = useState({
    alamatLengkap: '',
    kodePos: '',
    whatsapp: '',
    email: '',
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/desa');
      if (response.data.success && response.data.data.length > 0) {
        const data = response.data.data[0];
        setDesaId(data.id);
        setFormData({
          alamatLengkap: data.alamatLengkap || '',
          kodePos: data.kodePos || '',
          whatsapp: data.kontak?.whatsapp || '',
          email: data.kontak?.email || '',
          instagram: data.kontak?.instagram || '',
          facebook: data.kontak?.facebook || '',
          youtube: data.kontak?.youtube || '',
          tiktok: data.kontak?.tiktok || ''
        });
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!desaId) {
      alert("Data desa tidak ditemukan.");
      return;
    }
    
    setSaving(true);
    try {
      const payload = {
        alamatLengkap: formData.alamatLengkap,
        kodePos: formData.kodePos,
        kontak: {
          whatsapp: formData.whatsapp,
          email: formData.email,
          instagram: formData.instagram,
          facebook: formData.facebook,
          youtube: formData.youtube,
          tiktok: formData.tiktok
        }
      };

      const response = await api.put(`/admin/desa/${desaId}`, payload);
      if (response.data.success) {
        alert("Berhasil menyimpan kontak!");
      } else {
        alert("Gagal menyimpan kontak.");
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
    <div className="crud-container">
      <div className="crud-header">
        <h2>Kelola Kontak & Informasi</h2>
      </div>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <form onSubmit={handleSubmit} className="crud-form">
          <div className="form-group">
            <label>Alamat Lengkap</label>
            <textarea
              name="alamatLengkap"
              value={formData.alamatLengkap}
              onChange={handleInputChange}
              rows="2"
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Kode Pos</label>
            <input
              type="text"
              name="kodePos"
              value={formData.kodePos}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Nomor WhatsApp (Contoh: 6281234567890)</label>
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Desa</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Username Instagram (Contoh: @desagumiwang)</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Halaman Facebook (Contoh: Pemdes Gumiwang)</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Username YouTube (Contoh: @desagumiwang)</label>
            <input
              type="text"
              name="youtube"
              value={formData.youtube}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Username TikTok (Contoh: @desagumiwang)</label>
            <input
              type="text"
              name="tiktok"
              value={formData.tiktok}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions" style={{ marginTop: '20px', justifyContent: 'flex-start' }}>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KelolaKontak;
