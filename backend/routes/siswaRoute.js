import express from "express";
import {
  getSiswa,
  getSiswaID,
  createSiswa,
  updateSiswa,
  deleteSiswa,
} from "../controller/siswaController.js";

const router = express.Router();

router.get("/siswa", getSiswa);
router.get("/siswa/:id", getSiswaID);
router.post("/siswa", createSiswa);
router.put("/siswa/:id", updateSiswa);
router.delete("/siswa/:id", deleteSiswa);
export default router;
