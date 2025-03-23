import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    subtotal: {
        type: Number,
        required: true,
        default: 0,
    },
    total: {
        type: Number,
        required: true,
        default: 0,
    },
    tax: {
        type: Number,
        required: true,
        default: 0,
    },
    // relasi ke user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    // relasi ke movie
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
    },
    // relasi ke theater
    theater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
    },
    date: {
        type: String,
        required: true,
    },
    seats: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TransactionSeat",
        }
    ]
}, 
    {timestamps:true }, //timestamp utk create at / update at tgl berapa
); 

export default mongoose.model("Transaction", transactionSchema, "transactions");
// namma model, nama Schema, nama collection
