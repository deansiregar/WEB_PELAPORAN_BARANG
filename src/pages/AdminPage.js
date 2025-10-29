import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AdminPage() {
    // State untuk data Pending
    const [pendingReports, setPendingReports] = useState([]);
    // State untuk data Processed (Published/Rejected)
    const [processedReports, setProcessedReports] = useState([]);
    
    // State UI
    const [view, setView] = useState('pending'); // 'pending' atau 'processed'
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    const getToken = () => localStorage.getItem('adminToken');
    
    // --- Fungsi Fetch Data Pending ---
    const fetchPendingReports = async () => {
        const token = getToken();
        if (!token) { navigate('/login'); return; }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/admin/reports/pending', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('adminToken');
                navigate('/login');
                return;
            }
            if (!response.ok) { throw new Error('Gagal mengambil data laporan pending'); }
            
            const data = await response.json();
            setPendingReports(data);
        } catch (err) {
            console.error("Error fetching pending reports:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Fungsi Fetch Data Processed ---
    const fetchProcessedReports = async () => {
        const token = getToken();
        if (!token) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/admin/reports/processed', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('adminToken');
                navigate('/login');
                return;
            }
            if (!response.ok) { throw new Error('Gagal mengambil data laporan selesai'); }
            
            const data = await response.json();
            setProcessedReports(data);
        } catch (err) {
            console.error("Error fetching processed reports:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- Fungsi Delete Permanen ---
    const handleDeletePermanent = async (id) => {
        if (!window.confirm("Yakin hapus permanen? Aksi ini tidak dapat dibatalkan, dan file gambar akan dihapus dari server!")) {
            return;
        }

        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8000/api/admin/reports/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                alert('Sesi admin berakhir. Silakan login kembali.');
                localStorage.removeItem('adminToken');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                 const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Gagal menghapus permanen');
            }
            
            alert(`Laporan ID ${id} berhasil dihapus permanen.`);
            
            // Setelah sukses, refresh data Processed Reports
            fetchProcessedReports(); 

        } catch (err) {
            console.error(`Error deleting report ${id}:`, err);
            alert(`Gagal menghapus permanen: ${err.message}`);
        }
    };
    // --- Akhir Fungsi Delete Permanen ---

    // --- Fungsi Approve & Reject ---
    const handleApprove = async (id) => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8000/api/admin/reports/${id}/approve`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401 || response.status === 403) { /* ... */ }
            if (!response.ok) { /* ... */ }

            // Setelah sukses, refresh data pending
            fetchPendingReports(); 
            // Dan secara opsional, refresh processed reports juga
            fetchProcessedReports();
        } catch (err) { /* ... */ }
    };

    const handleReject = async (id) => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8000/api/admin/reports/${id}/reject`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 401 || response.status === 403) { /* ... */ }
            if (!response.ok) { /* ... */ }

            // Setelah sukses, refresh data pending
            fetchPendingReports(); 
            // Dan secara opsional, refresh processed reports juga
            fetchProcessedReports();
        } catch (err) { /* ... */ }
    };
    // --- Akhir Fungsi Approve & Reject ---


    // --- UseEffect untuk Mengambil Data Awal ---
    useEffect(() => {
        if (!getToken()) {
            navigate('/login');
            return;
        }
        
        // Panggil fetch sesuai view aktif
        if (view === 'pending') {
            fetchPendingReports();
        } else {
            fetchProcessedReports();
        }
        
    }, [view]); // Jalankan ulang saat 'view' berubah


    // --- JSX Render ---
    const reportsToDisplay = view === 'pending' ? pendingReports : processedReports;

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar Admin */}
            <nav className="bg-white shadow">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <span className="flex items-center font-bold text-xl text-indigo-600">Admin Panel</span>
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-sm text-gray-600 hover:text-indigo-600">
                                Situs Utama
                            </Link>
                            {/* Tombol Logout */}
                            <button
                                onClick={handleLogout} 
                                className="px-3 py-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Admin Panel
                </h1>

                {/* Tombol Toggle View */}
                <div className="flex mb-6 space-x-4">
                    <button 
                        onClick={() => setView('pending')}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${view === 'pending' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                    >
                        Antrian Verifikasi ({pendingReports.length})
                    </button>
                     <button 
                        onClick={() => setView('processed')}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${view === 'processed' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border border-gray-300'}`}
                    >
                        Laporan Selesai ({processedReports.length})
                    </button>
                </div>


                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {view === 'pending' ? 'Antrian Verifikasi' : 'Laporan Selesai'}
                </h2>

                {/* Tampilkan Loading atau Error */}
                {isLoading && <p className="text-center text-gray-500 py-8">Memuat laporan...</p>}
                {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}

                {/* Tabel (Hanya tampil jika tidak loading/error) */}
                {!isLoading && !error && (
                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barang</th>
                                        {view === 'processed' && 
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th> 
                                        }
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelapor</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* Pesan jika kosong */}
                                    {reportsToDisplay.length === 0 && (
                                        <tr>
                                            <td colSpan={view === 'pending' ? "5" : "6"} className="px-6 py-12 text-center text-gray-500">
                                                {view === 'pending' ? 'Tidak ada laporan yang menunggu verifikasi.' : 'Tidak ada laporan yang telah diproses.'}
                                            </td>
                                        </tr>
                                    )}
                                    
                                    {/* Loop data */}
                                    {reportsToDisplay.map((report) => (
                                        <tr key={report.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.report_type}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.item}</td> 
                                            
                                            {/* Kolom Status (Hanya di view processed) */}
                                            {view === 'processed' && 
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.verification_status}</td>
                                            }

                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.reporter}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <Link
                                                    to={`/detail/${report.id}`}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Lihat
                                                </Link>
                                                
                                                {view === 'pending' ? (
                                                    // Tombol untuk View Pending
                                                    <>
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
                                                    </>
                                                ) : (
                                                    // Tombol untuk View Processed
                                                    <button
                                                        onClick={() => handleDeletePermanent(report.id)}
                                                        className="text-red-600 hover:text-red-900"
                                                    >
                                                        Hapus Permanen
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}