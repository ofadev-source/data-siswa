import { Link } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function DaftarSiswa() {
  const { data: siswa, error, mutate } = useSWR('http://localhost:8000/siswa', fetcher);

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus siswa ini?')) {
      try {
        await axios.delete(`http://localhost:8000/siswa/${id}`);
        mutate();
      } catch (error) {
        console.error('Error deleting siswa:', error);
      }
    }
  };

  if (error) return <div className="text-center text-red-500">Error loading data</div>;
  if (!siswa) return <div className="text-center">Loading...</div>;

  return (
    <div className="shadow-lg rounded-xl p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-blue-600 ">Daftar Siswa</h2>
        <Link to="/tambah" className="bg-blue-600 p-3 rounded-2xl text-white font-bold hover:bg-blue-700 transition duration-300 flex items-center gap-2">
          <FaPlus /> Tambah Siswa
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead className="bg-blue-200  text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">No</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Kode</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Nama</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Alamat</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Tanggal Lahir</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Jurusan</th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {siswa.map((s, index) => (
              <tr key={s.id} className={`hover:bg-blue-50 transition duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.kode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.alamat}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(s.tgl).toLocaleDateString('id-ID')}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{s.jurusan}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                  <Link to={`/edit/${s.id}`} className="text-blue-600 hover:text-blue-800 flex items-center gap-1 transition duration-200">
                    <FaEdit /> Edit
                  </Link>
                  <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-800 flex items-center gap-1 transition duration-200">
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
