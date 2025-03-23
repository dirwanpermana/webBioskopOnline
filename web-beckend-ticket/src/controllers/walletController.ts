// file ini untuk menampilkan ballance dan lates transaction
import type { Request, Response } from "express";
import Wallet from "../models/Wallet";
import type { CustomRequest } from "../types/Request";
import WalletTransaction from "../models/WalletTransaction";
import { topupSchema } from "../utils/zodSchema";
// get balance atau saldo customer
export const getBalance = async (req: CustomRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    return res.json({
      status: true,
      message: "success get data",
      data: {
        balance: wallet?.balance ?? 0,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get data",
      data: null,
      status: "failed",
    });
  }
};
// get topup history
export const getTopupHistory = async (req: CustomRequest, res: Response) => {
  try {
    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });

    const data = await WalletTransaction.find({
      wallet: wallet?._id,
    }).select("wallet price createdAt status");

    return res.json({
      status: true,
      message: "success get data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to get data",
      data: null,
      status: "failed",
    });
  }
};
// get topupBalance
export const topupBalance = async (req: CustomRequest, res: Response) => {
  try {
    // Validasi data dari request body menggunakan `topupSchema`
    const parse = topupSchema.parse(req.body);
    // Mengambil URL dan autentikasi Midtrans dari environment variables
    const midtransUrl = process.env.MIDTRANS_TRANSACTION_URL ?? ""; // URL untuk endpoint Midtrans
    const midtransAuth = process.env.MIDTRANS_AUTH_STRING ?? ""; // Authentication key untuk Midtrans
    // Mencari wallet yang terkait dengan user yang sedang login
    const wallet = await Wallet.findOne({
      user: req?.user?.id,
    });
    // Membuat instance transaksi top-up baru dengan status "pending"
    const topup = new WalletTransaction({
      wallet: wallet?.id,
      price: parse.balance,
      status: "pending",
    });
    // Menyiapkan request ke API Midtrans untuk membuat transaksi pembayaran
    const midtransRequest = new Request(midtransUrl, {
      method: "POST", //method post mengikuti docs midtrans nya
      body: JSON.stringify({
        transaction_details: {
          order_id: topup.id,
          gross_amount: parse.balance,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.user?.email,
        },
        // URL callback setelah pembayaran selesai
        callbacks: {
          finish: process.env.SUCCESS_PAYMENT_REDIRECT,
        },
      }),
      headers: {
        Accept: "application/json", // Format respons yang diharapkan
        "Content-Type": "application/json", // Format request JSON
        Authorization: `BASIC ${midtransAuth}`, // Header otorisasi untuk autentikasi Midtrans
      },
    });
    // Mengirim request ke Midtrans dan menunggu respons
    const midtransResponse = await fetch(midtransRequest);
    const midtransJson = await midtransResponse.json(); // Parsing hasil respons ke JSON

    await topup.save(); // save transaksi top-up ke db

    return res.json({
      status: true,
      message: "topup success",
      data: midtransJson,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to topup balance",
      data: null,
      status: "failed",
    });
  }
};

export const handleTopupBalance = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const orderId = body.order_id;

    switch (body.transaction_status) {
      case "capture":
      case "settlement": {
        const walletTransaction = await WalletTransaction.findById(orderId);
        const wallet = await Wallet.findById(walletTransaction?.wallet);

        await WalletTransaction.findByIdAndUpdate(orderId, {
          status: "success",
        });

        const currentBalance = wallet?.balance ?? 0;
        const additionalBalance = walletTransaction?.price ?? 0;

        await Wallet.findByIdAndUpdate(wallet?.id, {
          balance: currentBalance + additionalBalance,
        });

        break;
      }

      case "deny":
      case "cancel":
      case "expire":
      case "failure": {
        await WalletTransaction.findByIdAndUpdate(orderId, {
          status: "failed",
        });

        break;
      }

      default:
        break;
    }

    return res.json({ status: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to topup balance",
      data: null,
      status: "failed",
    });
  }
};
