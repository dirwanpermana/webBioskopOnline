import type { BaseResponse } from "@/types/response";
import type { Transaction } from "./transaction.type";
import { privateInstance } from "@/lib/axios";

export const getOrders = (): Promise<BaseResponse<Transaction[]>> =>
  privateInstance.get("/customer/orders").then((res) => res.data);

export const getOrderDetail = (
  orderId: string
): Promise<BaseResponse<Transaction>> =>
  privateInstance.get(`/customer/orders/${orderId}`).then((res) => res.data);
