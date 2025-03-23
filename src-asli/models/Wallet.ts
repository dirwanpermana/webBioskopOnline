import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    balance: {
        type: Number,
        required: true,
        default: 0,
    },
});

export default mongoose.model("Wallet", walletSchema, "wallets");