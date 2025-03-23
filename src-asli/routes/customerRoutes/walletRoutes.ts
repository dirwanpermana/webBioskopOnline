// file utk panggil wallet controller
import express from "express";
import {
	getBalance,
	getTopupHistory,
	topupBalance,
} from "../../controllers/walletController";
import { validateRequest } from "../../middlewares/validateRequest";
import { topupSchema } from "../../utils/zodSchema";

const walletRoutes = express.Router();

walletRoutes.get("/check-balance", getBalance);
walletRoutes.get("/topup-history", getTopupHistory);
walletRoutes.post("/topup", validateRequest(topupSchema), topupBalance);

export default walletRoutes;
