import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

// Import semua komponen halaman Anda
import HomePage from './pages/HomePage';
import ReportPage from './pages/ReportPage';
import BrowsePage from './pages/BrowsePage';
import DetailPage from './pages/DetailPage';
import AdminPage from './pages/AdminPage';
// import NotFoundPage from './pages/NotFoundPage'; // Opsional: Halaman 404

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/lapor" element={<ReportPage />} />
      <Route path="/cari" element={<BrowsePage />} />
      <Route path="/detail/:itemId" element={<DetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}

export default App;