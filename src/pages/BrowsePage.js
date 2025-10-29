import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ItemCard from '../components/ItemCard';
import { allItems } from '../data/items'; // Import data

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua Status');

  const filteredItems = useMemo(() => {
    return allItems
      .filter(item => {
        if (statusFilter === 'Semua Status') return true;
        return item.status === statusFilter;
      })
      .filter(item => {
        if (searchTerm === '') return true;
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
  }, [searchTerm, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Cari Barang Hilang atau Ditemukan
        </h1>

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Filter Status */}
          <div className="flex-shrink-0">
            <select
              id="status-filter"
              name="status-filter"
              className="block w-full sm:w-auto rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>Semua Status</option>
              <option>Hilang</option>
              <option>Ditemukan</option>
            </select>
          </div>
          <button 
            type="button" 
            className="flex-shrink-0 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 opacity-50 cursor-not-allowed"
            disabled
          >
            Cari
          </button>
        </div>

        {/* Grid Daftar Barang */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item) => (
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

        {/* Pesan jika tidak ada hasil */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-700">Tidak ada barang yang ditemukan</h3>
            <p className="text-sm text-gray-500">Coba ubah kata kunci pencarian atau filter Anda.</p>
          </div>
        )}

        {/* (Pagination bisa ditambahkan nanti) */}
      </main>

      <Footer />
    </div>
  );
}