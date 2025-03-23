// file service wallet

import { BaseResponse } from "@/types/response";
import { WalletTopup, WalletTransaction } from "./wallet.type";
import { privateInstance } from "@/lib/axios";

// buat endpoint walletTransaction
export const getWalletTransactions = async (): Promise<
  BaseResponse<WalletTransaction[]>
> => privateInstance.get("/customer/topup-history").then((res) => res.data);

// endpoint walletTopup
export const topupWallet = async (data: { balance: number }): Promise<
	BaseResponse<WalletTopup>
> => privateInstance.post("/customer/topup", data).then((res) => res.data);