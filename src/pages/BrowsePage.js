import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
// Hapus import data dummy jika masih ada

export default function BrowsePage() {
  const [allItems, setAllItems] = useState([]); // Data dari API
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status'); // Nilai: 'Semua Status', 'Hilang', 'Ditemukan'
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  // Ambil data saat komponen dimuat
  useEffect(() => {
    setIsLoading(true); // Mulai loading
    setError(null); // Reset error
    fetch('http://localhost:8000/api/reports')
      .then(res => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return res.json();
      })
      .then(data => {
        setAllItems(data); // Simpan data ke state
        setIsLoading(false); // Selesai loading
      })
      .catch(err => {
        console.error("Gagal mengambil data:", err);
        setError(err.message); // Simpan pesan error
        setIsLoading(false); // Selesai loading (meskipun error)
      });
  }, []); // Dependensi kosong, hanya jalan sekali saat mount

  // Logika Filter (Sudah diperbaiki)
  const filteredItems = useMemo(() => {
    // Pastikan allItems bukan array kosong sebelum filter
    if (!allItems || allItems.length === 0) {
        return [];
    }
    
    return allItems
      .filter(item => {
        // --- PERBAIKAN FILTER STATUS ---
        // Cocokkan dengan 'report_type' dari backend
        if (statusFilter === 'Semua Status') return true;
        // Pastikan nama properti 'report_type' sesuai dengan data dari backend
        return item.report_type === statusFilter; 
        // --- AKHIR PERBAIKAN ---
      })
      .filter(item => {
        // Filter pencarian (tetap sama)
        if (searchTerm === '') return true;
        // Pastikan nama properti 'title' sesuai dengan data dari backend
        return item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  // --- PERBAIKAN DEPENDENSI useMemo ---
  }, [allItems, searchTerm, statusFilter]); // Tambahkan allItems
  // --- AKHIR PERBAIKAN ---

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Cari Barang Hilang atau Ditemukan
        </h1>

        {/* ... (Kontrol Pencarian dan Filter tetap sama) ... */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-grow">
            <input
              type="text"
              name="search" id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari berdasarkan nama barang..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter Status */}
          <div className="flex-shrink-0">
            <select
              id="status-filter" name="status-filter"
              className="block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Hilang</option>
              <option>Ditemukan</option>
            </select>
          </div>
           {/* Tombol Cari (tetap disabled) */}
           <button 
            type="button" 
            className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 opacity-50 cursor-not-allowed"
            disabled >
            Cari
          </button>
        </div>

        {/* Tampilkan Loading atau Error */}
        {isLoading && <p className="text-center text-gray-500 py-8">Memuat data...</p>}
        {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}

        {/* Grid Daftar Barang (Hanya tampil jika tidak loading dan tidak error) */}
        {!isLoading && !error && (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  // --- PERBAIKAN PROP STATUS ---
                  status={item.report_type} // Gunakan report_type dari backend
                  // --- AKHIR PERBAIKAN ---
                  location={item.location}
                  // Format tanggal jika perlu (opsional)
                  date={new Date(item.event_date).toLocaleString('id-ID')} 
                  imageUrl={item.image_url || 'https://via.placeholder.com/300x200?text=No+Image'} // Fallback image
                />
              ))}
            </div>

            {/* Tampilkan pesan jika tidak ada hasil */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-700">Tidak ada barang yang ditemukan</h3>
                <p className="text-sm text-gray-500">Coba ubah kata kunci pencarian atau filter Anda.</p>
              </div>
            )}
          </>
        )}

        {/* ... (Pagination bisa ditambahkan nanti) ... */}
      </main>

      <Footer />
    </div>
  );
}