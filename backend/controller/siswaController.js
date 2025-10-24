import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getSiswa = async (req, res) => {
  try {
    const response = await prisma.data_siswa.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getSiswaID = async (req, res) => {
  try {
    const response = await prisma.data_siswa.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createSiswa = async (req, res) => {
  const { kode, nama, alamat, tgl, jurusan } = req.body;
  try {
    const response = await prisma.data_siswa.create({
      data: {
        kode: kode,
        nama: nama,
        alamat: alamat,
        tgl: new Date(tgl),
        jurusan: jurusan,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateSiswa = async (req, res) => {
  const { kode, nama, alamat, tgl, jurusan } = req.body;
  try {
    const response = await prisma.data_siswa.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        kode: kode,
        nama: nama,
        alamat: alamat,
        tgl: new Date(tgl),
        jurusan: jurusan,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSiswa = async (req, res) => {
  try {
    const response = await prisma.data_siswa.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
