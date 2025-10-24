import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) => axios.get(url).then(res => res.data);

export default function TambahSiswa() {
  const [form, setForm] = useState({ kode: '', nama: '', alamat: '', tgl: '', jurusan: '' });
  const navigate = useNavigate();
  const { mutate } = useSWR('http://localhost:8000/siswa', fetcher);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/siswa', form);
      mutate();
      navigate('/');
    } catch (error) {
      console.error('Error adding siswa:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tambah Siswa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kode</label>
          <input type="text" name="kode" value={form.kode} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama</label>
          <input type="text" name="nama" value={form.nama} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Alamat</label>
          <input type="text" name="alamat" value={form.alamat} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
          <input type="date" name="tgl" value={form.tgl} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Jurusan</label>
          <input type="text" name="jurusan" value={form.jurusan} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2" />
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Tambah Siswa</button>
      </form>
    </div>
  );
}
