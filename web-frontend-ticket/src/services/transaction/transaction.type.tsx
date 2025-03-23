// ambil dari API orders

import type { Seat } from "../global/global.type";
import type { Movie } from "../movie/movie.type";
import type { Theater } from "../theater/theater.type";

type MovieTransaction = Pick<
	Movie,
	"title" | "genre" | "thumbnail" | "thumbnailUrl" | "price" | "bonus"
>;

export interface Transaction {
	_id: string;
	movie: MovieTransaction;
	theater: Pick<Theater, "name" | "city">; //ambil name dan city dari theater
	date: string;
	seats: Pick<Seat, "seat">[]; 
	subtotal: number;
	total: number;
	tax: number;
	bookingFee: number;
}
