// Buat API Pembelian ticket
import type { Response } from "express";
import type { CustomRequest } from "../types/Request";
import { transactionSchema } from "../utils/zodSchema";
import Wallet from "../models/Wallet";
import Transaction from "../models/Transaction";
import TransactionSeat from "../models/TransactionSeat";

export const transactionTicket = async (req: CustomRequest, res: Response) => {
  try {
    // ambil body transactionSchema
    const parse = transactionSchema.parse(req.body);
    // dapetin walet nya dgn cari id user
    const wallet = await Wallet.findOne({
      user: req.user?.id,
    });
    // jika gapunya wallet/saldo kurang dari total akan error
    if (!wallet || (wallet && wallet.balance < parse.total)) {
      return res.status(400).json({
        status: "failed",
        message: "Insufficient balance, please top up your balance first",
        data: null,
      });
    }
    // Jika balance walet > total buat transaksi baru
    const transaction = new Transaction({
      bookingFee: parse.bookingFee,
      total: parse.total,
      subtotal: parse.subtotal,
      theater: parse.theaterId,
      movie: parse.movieId,
      tax: parse.tax,
      user: req.user?.id,
      date: parse.date,
    });
    // Menambahkan data kursi yang dipesan ke dalam database
    for (const seat of parse.seats) {
      const newSeat = new TransactionSeat({
        transaction: transaction.id,
        seat: seat,
      });

      await newSeat.save();
    }
    // Mengambil semua kursi terkait dengan transaksi untuk dihubungkan ke transaksi utama
    const transactionSeats = await TransactionSeat.find({
      transaction: transaction.id,
    });
    // Menambahkan ID kursi ke dalam data transaksi
    transaction.seats = transactionSeats.map((va) => va._id);
    // Mengurangi saldo wallet pengguna sesuai dengan total transaksi
    const currBalance = wallet.balance ?? 0;

    await Wallet.findByIdAndUpdate(wallet.id, {
      balance: currBalance - parse.total,
    });

    await transaction.save();

    return res.json({
      message: "success transaction ticket",
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to transaction ticket",
      data: null,
      status: "failed",
    });
  }
};
// Get Order Ticket
export const getOrders = async (req: CustomRequest, res: Response) => {
  try {
    const transactions = await Transaction.find({
      //cari data user dari dile transaction
      user: req.user?.id,
    })
      // select data movie/ theater date dan status
      .select("seats movie theater date status")
      .populate({
        path: "movie",
        select: "thumbnail title genre -_id",
        populate: {
          path: "genre",
          select: "name -_id",
        },
      })
      .populate({
        path: "seats",
        select: "seat -_id",
      })
      .populate({
        path: "theater",
        select: "name city -_id",
      });

    return res.json({
      status: "success",
      data: transactions,
      message: "success get data",
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

// order detail
export const getOrderDetail = async (req: CustomRequest, res: Response) => {
  try {
    const { id } = req.params;

    const transaction = await Transaction.findById(id)

      .populate({
        path: "movie",
        select: "thumbnail price bonus title genre -_id",
        populate: {
          path: "genre",
          select: "name -_id",
        },
      })
      .populate({
        path: "seats",
        select: "seat -_id",
      })
      .populate({
        path: "theater",
        select: "name city -_id",
      });

    return res.json({
      status: "success",
      data: transaction,
      message: "success get data",
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
