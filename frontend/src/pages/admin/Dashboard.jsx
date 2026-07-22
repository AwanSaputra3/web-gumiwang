import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
      </div>
      <div className="admin-card">
        <p>Selamat datang di Halaman Admin Desa Wisata Gumiwang.</p>
        <p style={{ marginTop: '10px', color: '#6b7280' }}>
          Gunakan menu di sebelah kiri untuk mengelola konten website seperti Berita, Wisata, Komoditas, dan Galeri.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
