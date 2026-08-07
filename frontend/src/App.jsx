import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

// Public Layout Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Public Pages
import Beranda from './pages/Beranda.jsx';
import ProfilDesa from './pages/ProfilDesa.jsx';
// Removed Komoditas import
import Wisata from './pages/Wisata.jsx';
import DetailWisata from './pages/DetailWisata.jsx';
import DetailKomoditas from './pages/DetailKomoditas.jsx';
import PetaLokasi from './pages/PetaLokasi.jsx';
import Berita from './pages/Berita.jsx';
import Kontak from './pages/Kontak.jsx';
import DaftarUmkm from './pages/DaftarUmkm.jsx';
import ProfilUmkm from './pages/ProfilUmkm.jsx';

// Admin Components & Pages
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Login from './pages/admin/Login.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import { KelolaBerita, KelolaWisata, KelolaKomoditas, KelolaSettings, KelolaUmkm } from './pages/admin/AdminPages.jsx';
import KelolaKontak from './pages/admin/KelolaKontak.jsx';
import KelolaHome from './pages/admin/KelolaHome.jsx';

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
          <Route path="/komoditas/:id" element={<DetailKomoditas />} />
          <Route path="/wisata" element={<Wisata />} />
          <Route path="/wisata/:id" element={<DetailWisata />} />
          <Route path="/peta" element={<PetaLokasi />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/umkm" element={<DaftarUmkm />} />
          <Route path="/umkm/:id" element={<ProfilUmkm />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="home" element={<KelolaHome />} />

            <Route path="komoditas" element={<KelolaKomoditas />} />
            <Route path="umkm" element={<KelolaUmkm />} />
            <Route path="wisata" element={<KelolaWisata />} />
            <Route path="berita" element={<KelolaBerita />} />
            <Route path="kontak" element={<KelolaKontak />} />
            {/* Redirect /admin to /admin/dashboard */}
            <Route index element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
