import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ReportPage() {
  // State untuk mengontrol jenis laporan
  const [reportType, setReportType] = useState('kehilangan'); // 'kehilangan' atau 'penemuan'

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Buat Laporan Barang
            </h2>

            {/* Pilihan Jenis Laporan */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => setReportType('kehilangan')}
                className={`py-3 px-4 rounded-md font-medium text-sm ${
                  reportType === 'kehilangan'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Saya Kehilangan
              </button>
              <button
                onClick={() => setReportType('penemuan')}
                className={`py-3 px-4 rounded-md font-medium text-sm ${
                  reportType === 'penemuan'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Saya Menemukan
              </button>
            </div>

            {/* Formulir */}
            <form className="space-y-6">
              <div>
                <label htmlFor="item_name" className="block text-sm font-medium text-gray-700">
                  Nama Barang
                </label>
                <input
                  type="text"
                  name="item_name"
                  id="item_name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="cth: iPhone 12 Pro Max"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Detail barang, ciri-ciri, dll."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Lokasi {reportType === 'kehilangan' ? 'Kehilangan' : 'Penemuan'}
                  </label>
                  <input
                    type="text"
                    name="location"
                    id="location"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="cth: Perpustakaan Kampus"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Waktu Kejadian
                  </label>
                  <input
                    type="datetime-local"
                    name="date"
                    id="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Upload Foto */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Foto Barang</label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    {/* Icon */}
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h12l4-4h8a4 4 0 014 4v4m-4-4v8m0 0H20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                        <span>Upload file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">atau tarik dan lepas</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                  </div>
                </div>
              </div>

              {/* Data Pelapor (Sesuai jurnal, tidak perlu login) [cite: 121] */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Informasi Pelapor</h3>
                <p className="text-sm text-gray-500 mb-4">Data ini diperlukan agar Anda bisa dihubungi.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="reporter_name" className="block text-sm font-medium text-gray-700">
                      Nama Anda
                    </label>
                    <input
                      type="text"
                      name="reporter_name"
                      id="reporter_name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                      Email / No. WhatsApp
                    </label>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Tombol Submit */}
              <div className="text-right">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-6 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Kirim Laporan
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}