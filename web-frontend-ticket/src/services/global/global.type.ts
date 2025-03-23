// file hasil convert json to typescript untuk customer

import type { Genre } from "../genre/genre.type";
import type { Theater } from "../theater/theater.type";

export interface Movie {
	_id: string;
	title: string;
	genre: Pick<Genre, "name" | "_id">;
	thumbnail: string;
	thumbnailUrl: string;
	id: string;
}

type MovieTheater = Movie & {
	theaters: Pick<Theater, "_id" | "city">[];
};
// allMovie
export interface MovieExplore {
	filteredMovies: Movie[];
	allMovies: MovieTheater[];
}
// Data Detail Movie
export interface DataMovieDetail {
	movie: MovieDetail;
}

export interface Seat {
	seat: string;
	isBooked: boolean;
}

export interface MovieDetail extends Movie {
	theaters: Theater[];
	description: string;
	price: number;
	available: boolean;
	bonus: string;
	seats: Seat[];
	times: string[];
}

export interface SelectedSeat {
	seat: string;
	_id: string;
}

export interface Balance {
	balance: number;
}
