import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Admin Panel</h2>
          <p>Desa Gumiwang</p>
        </div>
        
        <nav className="admin-nav">
          <ul>
            <li>
              <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/berita" className={({ isActive }) => (isActive ? 'active' : '')}>
                Kelola Berita
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/wisata" className={({ isActive }) => (isActive ? 'active' : '')}>
                Kelola Wisata
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/komoditas" className={({ isActive }) => (isActive ? 'active' : '')}>
                Kelola Komoditas
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/galeri" className={({ isActive }) => (isActive ? 'active' : '')}>
                Kelola Galeri
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="admin-sidebar-footer">
          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="header-title">
            <h3>Selamat Datang, {user?.name || 'Admin'}</h3>
          </div>
          <div className="header-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="btn-view-site">
              Lihat Website
            </a>
          </div>
        </header>
        
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
