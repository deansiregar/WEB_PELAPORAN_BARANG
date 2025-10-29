import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';

// Di dalam HomePage.js
const recentItems = [
  {
    id: 1, // <-- Tambahkan ID
    title: 'Kunci Motor Honda',
    // ...props lainnya
  },
  {
    id: 2, // <-- Tambahkan ID
    title: 'Dompet Kulit Coklat',
    // ...props lainnya
  },
  {
    id: 3, // <-- Tambahkan ID
    title: 'Laptop Dell XPS 13',
    // ...props lainnya
  },
];

// Di bagian render:
{recentItems.map((item) => ( // Tidak perlu index lagi jika ID unik
   <ItemCard
     key={item.id} // <-- Gunakan ID sebagai key
     id={item.id} // <-- Berikan ID ke ItemCard
     title={item.title}
     status={item.status}
     location={item.location}
     date={item.date}
     imageUrl={item.imageUrl}
   />
))}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Kehilangan atau Menemukan Barang?
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Laporkan barang Anda yang hilang atau ditemukan di sini.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Saya Kehilangan Barang
            </a>
            <a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Saya Menemukan Barang
            </a>
          </div>
        </div>
      </header>

      {/* Laporan Terbaru */}
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Laporan Terbaru
        </h2>
        
        {/* Grid Daftar Barang */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item, index) => (
            <ItemCard
              key={index}
              title={item.title}
              status={item.status}
              location={item.location}
              date={item.date}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a
            href="#"
            className="text-indigo-600 font-medium hover:text-indigo-800"
          >
            Lihat Semua Laporan &rarr;
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}