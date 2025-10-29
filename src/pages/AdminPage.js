import React from 'react';
import Navbar from '../components/Navbar'; // Bisa diganti AdminNavbar nantinya

// Data dummy untuk antrian verifikasi
const pendingReports = [
  { id: 1, type: 'Kehilangan', item: 'iPhone 12', reporter: 'Budi' },
  { id: 2, type: 'Penemuan', item: 'Dompet Merah', reporter: 'Siti' },
];

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar khusus Admin bisa diletakkan di sini */}
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <span className="flex items-center font-bold text-xl text-indigo-600">Admin Panel</span>
          </div>
        </div>
      </nav>
      
      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Antrian Verifikasi Laporan
        </h1>
        
        {/* Tabel Laporan Pending */}
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Barang
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelapor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.item}
                  </td>
                  <td className="px-6 py-4 whitespace-nowring text-sm text-gray-500">
                    {report.reporter}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      Lihat Detail
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      Setujui
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      Tolak
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}