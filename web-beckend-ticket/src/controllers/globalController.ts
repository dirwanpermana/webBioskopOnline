import type { Request, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Transaction from "../models/Transaction";
import Theater from "../models/Theater";

export const getMovies = async (req: Request, res: Response) => {
	try {
		const data = await Movie.find()
			.select("title thumbnail")
			.populate({
				path: "genre",
				select: "name -_id",
			})
			.limit(3);

		return res.json({
			data: data,
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

export const getGenre = async (req: Request, res: Response) => {
	try {
		const genres = await Genre.find().select("name").limit(3);

		return res.json({
			data: genres,
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

export const getMovieDetail = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const seats = [];

		for (let i = 0; i < 5; i++) {
			seats.push({
				seat: `A${i + 1}`,
				isBooked: false,
			});
		}

		for (let i = 0; i < 5; i++) {
			seats.push({
				seat: `B${i + 1}`,
				isBooked: false,
			});
		}

		for (let i = 0; i < 5; i++) {
			seats.push({
				seat: `C${i + 1}`,
				isBooked: false,
			});
		}

		const movie = await Movie.findById(id)
			.populate({
				path: "theaters",
				select: "name city",
			})
			.populate({
				path: "genre",
				select: "name -_id",
			});

		return res.json({
			data: {
				movie: {
					...movie?.toJSON(),
					seats,
					times: ["12:30", "14:50", "18:30", "22:30", "23:30"],
				},
			},
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

export const getAvailableSeats = async (req: Request, res: Response) => {
	try {
		const { movieId } = req.params;
		const { date } = req.query;

		const transactions = await Transaction.find({
			date: date?.toString().replace("+", " "),
			movie: movieId,
		})
			.select("seats")
			.populate({
				path: "seats",
				select: "seat",
			});

		const seats = [];

		for (const seat of transactions) {
			seats.push(...seat.seats);
		}

		return res.json({
			data: seats,
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

export const getMoviesFilter = async (req: Request, res: Response) => {
	try {
		const { genreId } = req.params;
		const { city, theaters, availbility } = req.query;

		let filterQuery: any = {};

		if (genreId) {
			filterQuery = {
				...filterQuery,
				genre: genreId,
			};
		}

		if (city) {
			const theaters_lists = await Theater.find({
				city: city,
			});

			const theaterIds = theaters_lists.map((the) => the.id);

			filterQuery = {
				...filterQuery,
				theaters: {
					$in: [...theaterIds],
				},
			};
		}

		if (theaters) {
			const theaterIds2 = theaters as string[];

			filterQuery = {
				...filterQuery,
				theaters: {
					$in: [...(filterQuery?.theaters.$in ?? []), theaterIds2],
				},
			};
		}

		if (availbility === "true") {
			filterQuery = {
				...filterQuery,
				available: true,
			};
		}

		const data = await Movie.find({
			...filterQuery,
		})
			.select("title genre thumbnail")
			.populate({
				path: "genre",
				select: "name",
			});

		const allData = await Movie.find()
			.select("title genre theaters thumbnail")
			.populate({
				path: "genre",
				select: "name",
			})
			.populate({
				path: "theaters",
				select: "city",
			});

		return res.json({
			status: true,
			message: "success get data",
			data: {
				filteredMovies: data,
				allMovies: allData,
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
