// file ini untuk panggil Routes yg ada pada customer Routes

import express from "express";
import globalroutes from "./globalRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";
import walletRoutes from "./walletRoutes";
import {getTheaters} from "../../controllers/theaterController";

const customerRoutes = express.Router();

// gunakan midleware veifytoken, jika berhasil verifikasi data di kedua ini maka akan dilanjutkan utk next mengakses file yg lain, jika gagal akan error
//kedua ini perlu di paling atas
customerRoutes.use(verifyToken);
customerRoutes.use(verifyRole("customer"));

customerRoutes.use(globalroutes);  //panggil globalroutes
customerRoutes.use(walletRoutes);  //panggil walletRoutes

customerRoutes.get("/theaters", getTheaters) //getTheaters

export default customerRoutes;

