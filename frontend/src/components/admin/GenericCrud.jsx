import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import './GenericCrud.css';

const GenericCrud = ({ title, endpoint, columns, formFields, filterConfig }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageInputModes, setImageInputModes] = useState({});
  const [filterValue, setFilterValue] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/${endpoint}`);
      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran file maksimal 5 MB");
      return;
    }

    setUploadingImage(true);
    const formDataUpload = new FormData();
    formDataUpload.append('file', file);

    try {
      const response = await api.post('/admin/upload', formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data.success) {
        setFormData(prev => ({ ...prev, [fieldName]: response.data.url }));
      } else {
        alert("Gagal mengupload gambar: " + response.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengupload gambar.");
    } finally {
      setUploadingImage(false);
    }
  };

  const openAddModal = () => {
    setFormData({});
    setEditingId(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    let initialData = { ...item };
    formFields.forEach(f => {
      if (f.type === 'json' && initialData[f.name] && typeof initialData[f.name] !== 'string') {
        initialData[f.name] = JSON.stringify(initialData[f.name]);
      }
      if (f.type === 'array_text' && Array.isArray(initialData[f.name])) {
        initialData[f.name] = initialData[f.name].join('\n');
      }
    });
    setFormData(initialData);
    setEditingId(item.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Yakin ingin menghapus data ini?')) {
      try {
        await api.delete(`/admin/${endpoint}/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Gagal menghapus data.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = { ...formData };
      formFields.forEach(f => {
        if (f.type === 'json' && payload[f.name]) {
          try {
            payload[f.name] = JSON.parse(payload[f.name]);
          } catch(e) {}
        }
        if (f.type === 'array_text' && payload[f.name]) {
          payload[f.name] = payload[f.name].split('\n').map(s => s.trim()).filter(s => s !== '');
        }
      });

      if (editingId) {
        await api.put(`/admin/${endpoint}/${editingId}`, payload);
      } else {
        await api.post(`/admin/${endpoint}`, payload);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Gagal menyimpan data.");
    }
  };

  const toggleImageMode = (fieldName, mode) => {
    setImageInputModes(prev => ({ ...prev, [fieldName]: mode }));
  };

  const filteredData = filterConfig && filterValue
    ? data.filter(item => String(item[filterConfig.key]) === String(filterValue))
    : data;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>{title}</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {filterConfig && (
            <select 
              value={filterValue} 
              onChange={(e) => setFilterValue(e.target.value)}
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              {filterConfig.options.map((opt, i) => (
                <option key={i} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          )}
          <button className="btn-primary" onClick={openAddModal}>
            + Tambah Data
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div className="table-responsive">
          <table className="crud-table">
            <thead>
              <tr>
                <th>ID</th>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(item[col.key], item) : item[col.key]}
                    </td>
                  ))}
                  <td className="actions">
                    <button className="btn-edit" onClick={() => openEditModal(item)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(item.id)}>Hapus</button>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 2} className="text-center">Belum ada data.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingId ? 'Edit Data' : 'Tambah Data'}</h3>
            <form onSubmit={handleSubmit} className="crud-form">
              {formFields.map((field) => {
                const isImageModeFile = imageInputModes[field.name] === 'file';
                return (
                <div className="form-group" key={field.name}>
                  <label>{field.label}</label>
                  {field.type === 'textarea' || field.type === 'json' || field.type === 'array_text' ? (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                      rows="4"
                      placeholder={field.type === 'json' ? 'Masukkan dalam format JSON: ["A", "B"]' : field.type === 'array_text' ? 'Masukkan satu per baris' : ''}
                    ></textarea>
                  ) : field.type === 'select' ? (
                     <select
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                     >
                       <option value="">Pilih {field.label}</option>
                       {field.options.map(opt => (
                         <option key={opt.value} value={opt.value}>{opt.label}</option>
                       ))}
                     </select>
                  ) : field.type === 'image_upload' ? (
                     <div className="image-upload-field">
                        <div className="image-mode-toggle" style={{ marginBottom: '10px' }}>
                           <label style={{ marginRight: '15px' }}>
                              <input type="radio" name={`${field.name}_mode`} checked={!isImageModeFile} onChange={() => toggleImageMode(field.name, 'url')} /> URL
                           </label>
                           <label>
                              <input type="radio" name={`${field.name}_mode`} checked={isImageModeFile} onChange={() => toggleImageMode(field.name, 'file')} /> Upload File
                           </label>
                        </div>
                        {isImageModeFile ? (
                           <div className="file-upload-container">
                              <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, field.name)} disabled={uploadingImage} />
                              {uploadingImage && <span style={{ marginLeft: '10px', color: '#666' }}>Mengupload...</span>}
                              {formData[field.name] && !uploadingImage && (
                                 <div style={{ marginTop: '10px', fontSize: '12px', color: 'green' }}>
                                    ✓ File berhasil diupload: {formData[field.name]}
                                 </div>
                              )}
                           </div>
                        ) : (
                           <input
                              type="text"
                              name={field.name}
                              value={formData[field.name] || ''}
                              onChange={handleInputChange}
                              required={field.required && !formData[field.name]}
                              placeholder="https://example.com/image.jpg"
                           />
                        )}
                     </div>
                  ) : (
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name] || ''}
                      onChange={handleInputChange}
                      required={field.required}
                    />
                  )}
                </div>
              )})}
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Batal
                </button>
                <button type="submit" className="btn-primary" disabled={uploadingImage}>
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenericCrud;

