import React, { useState, useEffect } from 'react'; // <-- Import useState & useEffect
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
// Hapus import data dummy: import { allItems } from '../data/items';

export default function HomePage() {
  // --- State untuk menyimpan data terbaru, loading, dan error ---
  const [latestItems, setLatestItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // --- Akhir State ---

  // --- Ambil data saat komponen dimuat ---
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('http://localhost:8000/api/reports') // Panggil API
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data laporan');
        return res.json();
      })
      .then(data => {
        // Ambil 3 item teratas (API kita sudah mengurutkan DESC by created_at)
        setLatestItems(data.slice(0, 3)); 
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Gagal mengambil data terbaru:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []); // Dependensi kosong, hanya jalan sekali
  // --- Akhir Fetch Data ---

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section (Tetap sama) */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Kehilangan atau Menemukan Barang?
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Laporkan barang Anda yang hilang atau ditemukan di sini.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-col sm:flex-row"> 
            <Link
              to="/lapor"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Lapor Kehilangan
            </Link>
            <Link
              to="/lapor"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Lapor Penemuan
            </Link>
          </div>
        </div>
      </header>

      {/* Laporan Terbaru */}
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Laporan Terbaru
        </h2>
        
        {/* Tampilkan Loading, Error, atau Data */}
        {isLoading && <p className="text-center text-gray-500">Memuat laporan terbaru...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        
        {!isLoading && !error && (
          <>
            {/* Tampilkan pesan jika tidak ada data */}
            {latestItems.length === 0 && (
              <p className="text-center text-gray-500">Belum ada laporan yang dipublikasikan.</p>
            )}

            {/* Render data dari state 'latestItems' */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  status={item.report_type} // Gunakan field dari backend
                  location={item.location}
                  // Format tanggal dari backend
                  date={item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID') : '-'} 
                  imageUrl={item.image_url || 'https://via.placeholder.com/300x200?text=No+Image'} // Fallback
                />
              ))}
            </div>
          </>
        )}
        
        {/* Link ke halaman Cari (Tetap sama) */}
        <div className="text-center mt-8">
          <Link
            to="/cari"
            className="text-indigo-600 font-medium hover:text-indigo-800"
          >
            Lihat Semua Laporan &rarr;
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}