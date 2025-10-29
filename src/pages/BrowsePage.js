import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';

// Data dummy yang lebih banyak untuk halaman pencarian
const allItems = [
  {
    id: 1, // Tambahkan ID unik
    title: 'Kunci Motor Honda',
    status: 'Ditemukan',
    location: 'Parkiran Gedung A',
    date: '29 Okt 2025',
    imageUrl: 'https://via.placeholder.com/300x200?text=Kunci+Motor',
  },
  {
    id: 2,
    title: 'Dompet Kulit Coklat',
    status: 'Hilang',
    location: 'Kantin Pusat',
    date: '29 Okt 2025',
    imageUrl: 'https://via.placeholder.com/300x200?text=Dompet',
  },
  {
    id: 3,
    title: 'Laptop Dell XPS 13',
    status: 'Hilang',
    location: 'Perpustakaan, Lantai 3',
    date: '28 Okt 2025',
    imageUrl: 'https://via.placeholder.com/300x200?text=Laptop',
  },
  {
    id: 4,
    title: 'Tas Ransel Eiger Hitam',
    status: 'Ditemukan',
    location: 'Halte Bus Kampus',
    date: '27 Okt 2025',
    imageUrl: 'https://via.placeholder.com/300x200?text=Tas+Ransel',
  },
  {
    id: 5,
    title: 'Kacamata Minus',
    status: 'Hilang',
    location: 'Ruang Kelas B.102',
    date: '27 Okt 2025',
    imageUrl: 'https://via.placeholder.com/300x200?text=Kacamata',
  },
  // Tambahkan item lain jika perlu
];

export default function BrowsePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Cari Barang Hilang atau Ditemukan
        </h1>

        {/* Kontrol Pencarian dan Filter */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8 flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-grow">
            <label htmlFor="search" className="sr-only">Cari barang</label>
            <input
              type="text"
              name="search"
              id="search"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Cari berdasarkan nama barang..."
            />
          </div>
          {/* Filter Status */}
          <div className="flex-shrink-0">
            <select
              id="status-filter"
              name="status-filter"
              className="block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="Semua"
            >
              <option>Semua Status</option>
              <option>Hilang</option>
              <option>Ditemukan</option>
            </select>
          </div>
          <button className="flex-shrink-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Cari
          </button>
        </div>

        {/* Grid Daftar Barang */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allItems.map((item) => (
            <ItemCard
              // Gunakan ID unik sebagai key
              key={item.id}
              title={item.title}
              status={item.status}
              location={item.location}
              date={item.date}
              imageUrl={item.imageUrl}
              // Di sini Anda bisa menambahkan onClick handler untuk navigasi ke DetailPage
              // onClick={() => navigateToDetail(item.id)}
            />
          ))}
        </div>

        {/* Pagination (Contoh sederhana) */}
        <nav className="mt-12 flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
          <div className="-mt-px flex w-0 flex-1">
            <a href="#" className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
              {/* Icon panah kiri */}
              Sebelumnya
            </a>
          </div>
          <div className="hidden md:-mt-px md:flex">
            {/* Indikator halaman bisa ditambahkan di sini */}
            <span className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600">1</span>
            {/* ... Halaman lain */}
          </div>
          <div className="-mt-px flex w-0 flex-1 justify-end">
            <a href="#" className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
              Berikutnya
              {/* Icon panah kanan */}
            </a>
          </div>
        </nav>
      </main>

      <Footer />
    </div>
  );
}