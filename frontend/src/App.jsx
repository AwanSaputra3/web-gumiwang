import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Beranda from './pages/Beranda.jsx';
import ProfilDesa from './pages/ProfilDesa.jsx';
import Komoditas from './pages/Komoditas.jsx';
import Wisata from './pages/Wisata.jsx';
import DetailWisata from './pages/DetailWisata.jsx';
import PetaLokasi from './pages/PetaLokasi.jsx';
import Galeri from './pages/Galeri.jsx';
import Berita from './pages/Berita.jsx';
import Kontak from './pages/Kontak.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/profil" element={<ProfilDesa />} />
          <Route path="/komoditas" element={<Komoditas />} />
          <Route path="/wisata" element={<Wisata />} />
          <Route path="/wisata/:id" element={<DetailWisata />} />
          <Route path="/peta" element={<PetaLokasi />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/kontak" element={<Kontak />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
