import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function ReportPage() {
  const [reportType, setReportType] = useState('kehilangan');
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    dateTime: '',
    reporterName: '',
    contact: '',
  });

  // --- State untuk File Upload ---
  const [imageFile, setImageFile] = useState(null); // Menyimpan file (objek File)
  const [imagePreview, setImagePreview] = useState(null); // Menyimpan URL untuk preview
  // --- Akhir State ---

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // --- Fungsi untuk menangani perubahan file input ---
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // Simpan objek file
      setImagePreview(URL.createObjectURL(file)); // Buat URL preview
    }
  };

  // --- Fungsi untuk menghapus gambar ---
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    // Kita perlu me-reset input file juga
    document.getElementById('file-upload').value = null;
  };

  // --- Cleanup URL.createObjectURL untuk menghindari memory leak ---
  useEffect(() => {
    // Jalankan cleanup function saat komponen unmount atau imagePreview berubah
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);
  // --- Akhir Cleanup ---

  const handleSubmit = (e) => {
    e.preventDefault();
    const reportData = {
      type: reportType,
      ...formData,
      // Tambahkan nama file (nanti di backend, kita kirim 'imageFile'-nya)
      imageFileName: imageFile ? imageFile.name : null,
    };
    
    console.log('Data Laporan yang Akan Dikirim:', reportData);
    // Di aplikasi nyata, Anda akan menggunakan FormData untuk mengirim text + file
    // const dataToSubmit = new FormData();
    // dataToSubmit.append('reportData', JSON.stringify(reportData));
    // dataToSubmit.append('image', imageFile);
    // axios.post('/api/laporan/baru', dataToSubmit).then(...)

    alert('Laporan (dummy) terkirim! Cek console log.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Buat Laporan Barang
            </h2>

            {/* ... (Tombol Tipe Laporan) ... */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* ... (tombol 'Saya Kehilangan' dan 'Saya Menemukan') ... */}
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* ... (Input Nama Barang, Deskripsi, Lokasi, Waktu) ... */}

              {/* --- Area Upload Foto --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Foto Barang</label>
                
                {/* Tampilkan preview jika ada */}
                {imagePreview ? (
                  <div className="mt-2 relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-auto max-h-64 object-contain rounded-md border border-gray-300" 
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700"
                      aria-label="Hapus gambar"
                    >
                      {/* Ikon 'X' (Hapus) */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  // Tampilkan kotak upload jika tidak ada preview
                  <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4V12a4 4 0 014-4h12l4-4h8a4 4 0 014 4v4m-4-4v8m0 0H20" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500">
                          <span>Upload file</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only" 
                            accept="image/*" // Hanya terima file gambar
                            onChange={handleFileChange} // Hubungkan ke fungsi
                          />
                        </label>
                        <p className="pl-1">atau tarik dan lepas</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
                    </div>
                  </div>
                )}
              </div>
              {/* --- Akhir Area Upload Foto --- */}

                          {/* Data Pelapor */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Informasi Pelapor</h3>
                <p className="text-sm text-gray-500 mb-4">Data ini diperlukan agar Anda bisa dihubungi.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="reporterName" className="block text-sm font-medium text-gray-700">
                      Nama Anda
                    </label>
                    <input
                      type="text"
                      name="reporterName" // <-- Sesuaikan name
                      id="reporterName" // <-- Sesuaikan id
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.reporterName} // <-- Hubungkan ke state
                      onChange={handleInputChange} // <-- Tambahkan onChange
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                      Email / No. WhatsApp
                    </label>
                    <input
                      type="text"
                      name="contact" // <-- Sesuaikan name
                      id="contact"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={formData.contact} // <-- Hubungkan ke state
                      onChange={handleInputChange} // <-- Tambahkan onChange
                      required
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