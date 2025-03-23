import mongoose from "mongoose";

const walletTransactionSchema = new mongoose.Schema({
	wallet: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Wallet",
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "success", "failed"],
	},
});

export default mongoose.model(
	"WalletTransaction",
	walletTransactionSchema,
	"walletTransactions",
);
