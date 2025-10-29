import React from 'react';
import { useParams, Link } from 'react-router-dom'; // <-- Import useParams dan Link
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// (Sementara) Definisikan data dummy di sini atau impor dari file terpisah
const allItems = [
    {
        id: 1,
        title: 'Kunci Motor Honda',
        status: 'Ditemukan',
        location: 'Parkiran Gedung A',
        date: '29 Okt 2025, pukul 10:00',
        imageUrl: 'https://via.placeholder.com/600x400?text=Kunci+Motor',
        description: 'Kunci motor Honda Vario ditemukan di dekat tiang parkir P5.',
        reporterName: 'Satpam Gedung A',
        contactInfo: 'Pos Satpam',
        reportDate: '29 Oktober 2025',
    },
    {
        id: 2,
        title: 'Dompet Kulit Coklat',
        status: 'Hilang',
        location: 'Kantin Pusat',
        date: '29 Okt 2025, sekitar pukul 12:30',
        imageUrl: 'https://via.placeholder.com/600x400?text=Dompet',
        description: 'Dompet kulit warna coklat tua, berisi KTP, SIM, dan beberapa kartu ATM. Terakhir diletakkan di meja makan kantin.',
        reporterName: 'Budi Santoso',
        contactInfo: 'WA: 0812-xxxx-xxxx',
        reportDate: '29 Oktober 2025',
    },
    {
        id: 3,
        title: 'Laptop Dell XPS 13',
        status: 'Hilang',
        location: 'Perpustakaan, Lantai 3',
        date: '28 Oktober 2025, sekitar pukul 14:00',
        imageUrl: 'https://via.placeholder.com/600x400?text=Laptop+Dell',
        description: 'Laptop Dell XPS 13 warna silver, ada stiker lingkaran kecil di pojok kanan atas. Terakhir terlihat di meja dekat jendela di lantai 3 perpustakaan pusat. Mohon jika ada yang menemukan bisa menghubungi saya.',
        reporterName: 'Mahasiswa A',
        contactInfo: 'Email: mahasiswa.a@example.com',
        reportDate: '28 Oktober 2025',
    },
    // ... item lainnya dari BrowsePage.js
];


export default function DetailPage() {
  const { itemId } = useParams(); // <-- Ambil itemId dari URL

  // Cari item berdasarkan itemId. Ingat itemId dari URL berupa string, ID di data mungkin number.
  const itemDetail = allItems.find(item => item.id.toString() === itemId);

  // Handle jika item tidak ditemukan
  if (!itemDetail) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Item Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6">Maaf, item dengan ID "{itemId}" tidak dapat ditemukan.</p>
          <Link to="/cari" className="text-indigo-600 hover:underline">Kembali ke Daftar Barang</Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Jika item ditemukan, lanjutkan render seperti sebelumnya
  const isLost = itemDetail.status === 'Hilang';
  const statusBgColor = isLost ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  // const statusTextColor = isLost ? 'text-red-600' : 'text-green-600'; // Tidak terpakai?

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Tombol Kembali */}
        <div className="mb-6">
            <Link to="/cari" className="text-sm text-indigo-600 hover:underline">
                &larr; Kembali ke Daftar Barang
            </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Gambar Item */}
          <img className="h-64 w-full object-cover lg:h-96" src={itemDetail.imageUrl} alt={itemDetail.title} />

          <div className="p-6 lg:p-8">
            {/* Judul dan Status */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">
                {itemDetail.title}
              </h1>
              <span
                className={`inline-block px-4 py-1.5 text-sm font-semibold rounded-full ${statusBgColor}`}
              >
                Status: {itemDetail.status}
              </span>
            </div>

            {/* Detail Informasi */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm text-gray-600">
              <div>
                <strong className="block text-gray-800">Lokasi:</strong>
                <span>{itemDetail.location}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Waktu Kejadian:</strong>
                <span>{itemDetail.date}</span>
              </div>
              <div>
                <strong className="block text-gray-800">Tanggal Laporan:</strong>
                <span>{itemDetail.reportDate}</span>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Deskripsi</h2>
              <p className="text-gray-700 leading-relaxed">{itemDetail.description}</p>
            </div>

            {/* Informasi Pelapor */}
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Informasi Pelapor</h2>
              <div className="flex items-center mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                 </svg>
                <span className="text-gray-700">{itemDetail.reporterName}</span>
              </div>
               <div className="flex items-center">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                 </svg>
                <span className="text-gray-700">{itemDetail.contactInfo}</span>
              </div>
            </div>

             {/* Tombol Aksi */}
             <div className="mt-8 pt-6 border-t border-gray-200 text-center">
               <button
                 className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                   isLost ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-green-600 hover:bg-green-700'
                 }`}
               >
                 {isLost ? 'Hubungi Jika Menemukan' : 'Hubungi Pemilik'}
               </button>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}