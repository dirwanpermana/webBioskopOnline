import type { Request, Response } from "express";
import User from "../models/User";
import WalletTransaction from "../models/WalletTransaction";
import Transaction from "../models/Transaction";
import transactionSeat from "../models/TransactionSeat";

export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await User.find({ role: "customer" }).select(
            "name email",
        );

        return res.json({
            data: customers,
            message: "Success get data",
            status: "Success",
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

// getwallet transactions butuh data transaksi nya
// populate utk ambil relasi data dari wallet dan select nya aja
export const getWalletTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await WalletTransaction.find().populate({
            path: "wallet",
            select: "user -_id",
            populate: {
                path: "user",
                select: "name",
            },
        });

        return res.json({
            data: transactions,
            message: "Success get data",
            status: "Success",
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

// TransactionSeat
export const getTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await Transaction.find()
            .populate({
                path: "user",
                select: "name -_id" //ambil title nya aja
            })
            .populate({
                path: "movie",
                select: "title -_id" //ambil title nya aja
            })
            .populate({
                path: "theater",
                select: "name -_id" //ambil title nya aja
            });

return res.json({
    data: transactionSeat,
    message: "Success get data",
    status: "Success"
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
