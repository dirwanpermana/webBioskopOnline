import express from "express";
import globalroutes from "./globalRoutes";
import { verifyRole, verifyToken } from "../../middlewares/verifyToken";
import walletRoutes from "./walletRoutes";
import { getTheaters } from "../../controllers/theaterController";

const customerRoutes = express.Router();

customerRoutes.use(verifyToken);
customerRoutes.use(verifyRole("customer"));
customerRoutes.use(globalroutes);
customerRoutes.use(walletRoutes);
customerRoutes.get("/theaters", getTheaters);

export default customerRoutes;
