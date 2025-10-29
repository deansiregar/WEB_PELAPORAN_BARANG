import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import { allItems } from '../data/items'; // Import data

// Ambil 3 item terbaru dari data dummy
const recentItems = allItems.slice(0, 3);

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
          {/* Tombol Responsif */}
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
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              status={item.status}
              location={item.location}
              date={item.date}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
        
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