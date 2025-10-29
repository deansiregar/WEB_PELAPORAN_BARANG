import React from 'react';
import { Routes, Route } from 'react-router-dom'; // <-- Import Routes dan Route
import './index.css'; // Atau './App.css' jika Anda membutuhkannya

// Import semua komponen halaman Anda
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import BrowsePage from './pages/BrowsePage'; // Pastikan file ini ada
import DetailPage from './pages/DetailPage'; // Pastikan file ini ada
import AdminPage from './pages/AdminPage';   // Pastikan file ini ada
// import NotFoundPage from './pages/NotFoundPage'; // Opsional: Halaman 404

function App() {
  return (
    <Routes> {/* <-- Gunakan Routes untuk mendefinisikan rute */}
      <Route path="/" element={<HomePage />} /> {/* Rute untuk halaman utama */}
      <Route path="/lapor" element={<ReportPage />} /> {/* Rute untuk halaman lapor */}
      <Route path="/cari" element={<BrowsePage />} /> {/* Rute untuk halaman pencarian */}
      <Route path="/detail/:itemId" element={<DetailPage />} /> {/* Rute untuk halaman detail dengan parameter ID */}
      <Route path="/admin" element={<AdminPage />} /> {/* Rute untuk halaman admin */}
      {/* <Route path="*" element={<NotFoundPage />} /> Opsional: Tangkap semua rute lain */}
    </Routes>
  );
}

export default App;