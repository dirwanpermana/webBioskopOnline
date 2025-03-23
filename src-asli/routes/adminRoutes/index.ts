// file ini untuk panggil Routes yg ada pada Admin Routes

import express from 'express'
import genreRoutes from './genreRoutes'
import theaterRoutes from './theaterRoutes'
import movieRoutes from './movieRoutes';
import customerRoutes from './customerRoutes';
import { verifyRole, verifyToken } from '../../middlewares/verifyToken';

const adminRoutes = express.Router()

// gunakan midleware veifytoken, jika berhasil verifikasi data di kedua ini maka akan dilanjutkan utk next mengakses file yg lain, jika gagal akan error
adminRoutes.use(verifyToken); //kedua ini perlu di paling atas
adminRoutes.use(verifyRole("admin"));

adminRoutes.use(genreRoutes);  //panggil genreRoutes dgn method use
adminRoutes.use(theaterRoutes);  //panggil theaterRoutes dgn method use
adminRoutes.use(movieRoutes);  //panggil movieRoutes dgn method use
adminRoutes.use(customerRoutes);  //panggil costumerRoutes dgn method use

export default adminRoutes;