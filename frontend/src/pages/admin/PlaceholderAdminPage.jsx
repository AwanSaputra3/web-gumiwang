import React from 'react';

const PlaceholderAdminPage = ({ title }) => {
  return (
    <div>
      <div className="admin-page-header">
        <h1>{title}</h1>
        <button className="btn-primary">+ Tambah Data</button>
      </div>
      <div className="admin-card">
        <p>Halaman ini sedang dalam tahap pengembangan (Placeholder).</p>
      </div>
    </div>
  );
};

export default PlaceholderAdminPage;
