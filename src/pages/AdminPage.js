import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import { Link, useNavigate } from 'react-router-dom';

// Hapus data dummy awal: const initialPendingReports = [...]

export default function AdminPage() {
    // State untuk data, loading, dan error
    const [pendingReports, setPendingReports] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // <-- Inisialisasi useNavigate
// --- Fungsi Logout (BARU) ---
    const handleLogout = () => {
        localStorage.removeItem('adminToken'); // Hapus token dari browser
        navigate('/login'); // Redirect ke halaman login
    };
    // --- AKHIR Logout ---

    // --- Fungsi untuk mendapatkan token dari localStorage ---
    const getToken = () => localStorage.getItem('adminToken');

// --- Fungsi untuk mengambil data pending ---
    const fetchPendingReports = async () => {
        const token = getToken();
        if (!token) {
            navigate('/login'); // Redirect jika tidak ada token
            return; 
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8000/api/admin/reports/pending', {
                headers: {
                    // Kirim token di header 'Authorization: Bearer [TOKEN]'
                    'Authorization': `Bearer ${token}` 
                }
            });

            // Cek jika status 401 atau 403 (Token Invalid/Expired/Tidak Disediakan)
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('adminToken'); // Hapus token busuk
                navigate('/login'); // Redirect ke login
                return;
            }
            if (!response.ok) {
                throw new Error('Gagal mengambil data laporan pending');
            }
            
            const data = await response.json();
            setPendingReports(data);
        } catch (err) {
            console.error("Error fetching pending reports:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // --- Ambil data saat komponen dimuat ---
    useEffect(() => {
        // Cek token saat mount (jika ada, lanjutkan fetch)
        if (!getToken()) {
            navigate('/login');
            return;
        }
        fetchPendingReports();
    }, []); 


    // --- Fungsi Approve (memanggil API) ---
    const handleApprove = async (id) => {
        const token = getToken();
        if (!token) return; // Seharusnya sudah di-redirect di useEffect

        try {
            const response = await fetch(`http://localhost:8000/api/admin/reports/${id}/approve`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}` // <-- Kirim token
                }
            });
            if (response.status === 401 || response.status === 403) {
                alert('Sesi admin berakhir. Silakan login kembali.');
                localStorage.removeItem('adminToken');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Gagal menyetujui laporan');
            }
            // Update state di frontend (hapus item yang sudah diproses)
            setPendingReports(currentReports =>
                currentReports.filter(report => report.id !== id)
            );
        } catch (err) {
            console.error(`Error approving report ${id}:`, err);
            alert(`Gagal menyetujui: ${err.message}`); 
        }
    };

    // --- Fungsi Reject (memanggil API) ---
    const handleReject = async (id) => {
        const token = getToken();
        if (!token) return;

        try {
            const response = await fetch(`http://localhost:8000/api/admin/reports/${id}/reject`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}` // <-- Kirim token
                }
            });
            if (response.status === 401 || response.status === 403) {
                alert('Sesi admin berakhir. Silakan login kembali.');
                localStorage.removeItem('adminToken');
                navigate('/login');
                return;
            }
            if (!response.ok) {
                 const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Gagal menolak laporan');
            }
            // Update state di frontend (hapus item yang sudah diproses)
            setPendingReports(currentReports =>
                currentReports.filter(report => report.id !== id)
            );
        } catch (err) {
            console.error(`Error rejecting report ${id}:`, err);
             alert(`Gagal menolak: ${err.message}`); 
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar Admin DENGAN Tombol Logout */}
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
                    Antrian Verifikasi Laporan
                </h1>
                
                {isLoading && <p className="text-center text-gray-500 py-8">Memuat laporan...</p>}
                {error && <p className="text-center text-red-600 py-8">Error: {error}</p>}
                
                {!isLoading && !error && (
                    <div className="bg-white shadow overflow-hidden rounded-lg">
                        <div className="overflow-x-auto">
                            {/* ... (Tabel data) ... */}
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* ... (Header Tabel) ... */}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {/* ... (Logika render data dari pendingReports) ... */}
                                    {pendingReports.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                                Tidak ada laporan yang menunggu verifikasi.
                                            </td>
                                        </tr>
                                    )}
                                    {pendingReports.map((report) => (
                                        <tr key={report.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{report.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.report_type}</td> 
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{report.item}</td> 
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
                )}
            </main>
        </div>
    );
}