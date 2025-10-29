import React from 'react';

/**
 * Props:
 * - title: "iPhone 12"
 * - status: "Hilang" | "Ditemukan"
 * - location: "Perpustakaan Kampus"
 * - imageUrl: URL gambar barang
 * - date: "28 Oktober 2025"
 */
export default function ItemCard({ title, status, location, imageUrl, date }) {
  const isLost = status === 'Hilang';
  
  // Tentukan warna label berdasarkan status
  const statusBgColor = isLost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        {/* Label Status */}
        <span 
          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusBgColor} mb-2`}
        >
          {status}
        </span>
        
        <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{location}</p>
        <p className="text-xs text-gray-500 mt-2">{date}</p>
        
        <button className="mt-4 w-full text-indigo-600 font-medium text-sm py-2 rounded-md border border-indigo-200 hover:bg-indigo-50">
          Lihat Detail
        </button>
      </div>
    </div>
  );
}