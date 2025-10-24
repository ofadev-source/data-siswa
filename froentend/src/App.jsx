

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DaftarSiswa from './components/DaftarSiswa';
import TambahSiswa from './components/TambahSiswa';
import EditSiswa from './components/EditSiswa';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen ">
        <header className="bg-blue-600 shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-white">Manajemen Data Siswa</h1>
          </div>
        </header>
        <nav className="bg-blue-600 text-white">
          
        </nav>
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<DaftarSiswa />} />
            <Route path="/tambah" element={<TambahSiswa />} />
            <Route path="/edit/:id" element={<EditSiswa />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
