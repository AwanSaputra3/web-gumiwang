import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

// Public Layout Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Public Pages
import Beranda from './pages/Beranda.jsx';
import ProfilDesa from './pages/ProfilDesa.jsx';
import Komoditas from './pages/Komoditas.jsx';
import Wisata from './pages/Wisata.jsx';
import DetailWisata from './pages/DetailWisata.jsx';
import PetaLokasi from './pages/PetaLokasi.jsx';
import Galeri from './pages/Galeri.jsx';
import Berita from './pages/Berita.jsx';
import Kontak from './pages/Kontak.jsx';

// Admin Components & Pages
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import PlaceholderAdminPage from './pages/admin/PlaceholderAdminPage.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const PublicLayout = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/profil" element={<ProfilDesa />} />
          <Route path="/komoditas" element={<Komoditas />} />
          <Route path="/wisata" element={<Wisata />} />
          <Route path="/wisata/:id" element={<DetailWisata />} />
          <Route path="/peta" element={<PetaLokasi />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/kontak" element={<Kontak />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="berita" element={<PlaceholderAdminPage title="Kelola Berita" />} />
            <Route path="wisata" element={<PlaceholderAdminPage title="Kelola Wisata" />} />
            <Route path="komoditas" element={<PlaceholderAdminPage title="Kelola Komoditas" />} />
            <Route path="galeri" element={<PlaceholderAdminPage title="Kelola Galeri" />} />
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
