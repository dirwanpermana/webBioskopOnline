import express from "express";
import {
	getCustomers,
	getTransactions,
	getWalletTransactions,
} from "../../controllers/customerController";

const customerRoutes = express.Router();

customerRoutes.get("/customers", getCustomers);
customerRoutes.get("/wallet-transactions", getWalletTransactions);
customerRoutes.get("/ticket-transactions", getTransactions);

export default customerRoutes;
