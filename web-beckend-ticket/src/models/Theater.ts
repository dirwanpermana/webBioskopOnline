// file model theater ini untuk insert ke db
import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    // untuk relasi ke movie
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Theater", theaterSchema, "theaters");
