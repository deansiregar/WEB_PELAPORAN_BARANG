import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Data dummy awal
const initialPendingReports = [
  { id: 1, type: 'Kehilangan', item: 'iPhone 12', reporter: 'Budi' },
  { id: 2, type: 'Penemuan', item: 'Dompet Merah', reporter: 'Siti' },
  { id: 3, type: 'Kehilangan', item: 'Kunci Motor Beat', reporter: 'Joko' },
  // Kita bisa tambahkan ID dari data utama untuk testing link
  { id: 4, type: 'Penemuan', item: 'Tas Ransel Eiger Hitam', reporter: 'Penemu B' },
];

export default function AdminPage() {
  const [pendingReports, setPendingReports] = useState(initialPendingReports);

  const handleApprove = (id) => {
    setPendingReports(currentReports =>
      currentReports.filter(report => report.id !== id)
    );
    console.log(`Laporan ID: ${id} disetujui.`);
  };

  const handleReject = (id) => {
    setPendingReports(currentReports =>
      currentReports.filter(report => report.id !== id)
    );
    console.log(`Laporan ID: ${id} ditolak.`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <span className="flex items-center font-bold text-xl text-indigo-600">Admin Panel</span>
            <div className="flex items-center">
              <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">
                Kembali ke Situs Utama
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Antrian Verifikasi Laporan
        </h1>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          {/* Tambahkan overflow-x-auto untuk responsivitas tabel di HP */}
          <div className="overflow-x-auto">
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
                {pendingReports.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                      Tidak ada laporan yang menunggu verifikasi.
                    </td>
                  </tr>
                )}

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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.reporter}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Link 
                        to={`/detail/${report.id}`} 
                        className="text-indigo-600 hover:text-indigo-900"
                        target="_blank"
                        rel="noopener noreferrer" // Tambahkan untuk keamanan
                      >
                        Lihat
                      </Link>
                      
                      <button 
                        onClick={() => handleApprove(report.id)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Setujui
                      </button>
                      <button 
                        onClick={() => handleReject(report.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Tolak
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}