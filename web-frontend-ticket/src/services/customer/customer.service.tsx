import { privateInstance } from "@/lib/axios";
import { BaseResponse } from "@/types/response";
import { Transaction, User, WalletTransaction } from "./customer.type";

// get API customer
export const getCustomers = () : Promise<BaseResponse<User[]>> => privateInstance.get("/admin/customers").then((res) => res.data);

// get api transksi
export const getTransactions = (): Promise<BaseResponse<Transaction[]>> =>
	privateInstance.get("/admin/ticket-transactions").then((res) => res.data);

// get api wallet transaksi
export const getWalletTransactions = (): Promise<
	BaseResponse<WalletTransaction[]>
> => privateInstance.get("/admin/wallet-transactions").then((res) => res.data);