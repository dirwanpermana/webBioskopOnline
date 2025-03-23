// file ini untuk panggil Routes yg ada pada Admin Routes
import express from "express";
import genreRoutes from "./genreRoutes";
import theaterRoutes from "./theaterRoutes";
import movieRoutes from "./movieRoutes";
import customerRoutes from "./customerRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";

const adminRoutes = express.Router();
// gunakan midleware veifytoken, jika berhasil verifikasi data di kedua ini maka akan dilanjutkan utk next mengakses file yg lain, jika gagal akan error
// adminRoutes.use(verifyToken);
// adminRoutes.use(verifyRole("admin"));

//panggil Routes dgn method use
adminRoutes.use(genreRoutes);
adminRoutes.use(theaterRoutes);
adminRoutes.use(movieRoutes);
adminRoutes.use(customerRoutes);

export default adminRoutes;
