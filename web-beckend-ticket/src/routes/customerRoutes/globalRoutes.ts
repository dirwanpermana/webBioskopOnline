import express from "express";
import {
  getAvailableSeats,
  getGenre,
  getMovieDetail,
  getMovies,
  getMoviesFilter,
} from "../../controllers/globalController";
// import utk transaksi tiket
import { validateRequest } from "../../middlewares/validateRequest";
import { transactionSchema } from "../../utils/zodSchema";
import {
  getOrderDetail,
  getOrders,
  transactionTicket,
} from "../../controllers/ticketController";
// ambil getMovies dari globalController
const globalroutes = express.Router();

globalroutes.get("/movies", getMovies);
globalroutes.get("/genres", getGenre);
globalroutes.get("/movies/:id", getMovieDetail);
globalroutes.get("/check-seats/:movieId", getAvailableSeats);
globalroutes.get("/browse-movies/:genreId", getMoviesFilter);

// transaksi tiket
globalroutes.post(
  "/transaction/buy",
  validateRequest(transactionSchema),
  transactionTicket
);
globalroutes.get("/orders", getOrders);
globalroutes.get("/orders/:id", getOrderDetail);

export default globalroutes;
