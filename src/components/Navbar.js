import React from 'react';

// Navbar sederhana dengan link ke halaman utama dan tombol lapor
export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            {/* Ganti dengan Logo Anda */}
            <span className="font-bold text-xl text-indigo-600">Lost&Found</span>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Beranda
            </a>
            <a
              href="#"
              className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
            >
              Cari Barang
            </a>
            <a
              href="#"
              className="ml-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Lapor
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}