import type { Request, Response } from "express";
import Movie from "../models/Movie";
import Genre from "../models/Genre";
import Transaction from "../models/Transaction";
import Theater from "../models/Theater";

// get movies di halaman discover page
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

// get genre di halaman discover page
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

// get Movie Detail di halamman movie detail
export const getMovieDetail = async (req: Request, res: Response) => {
	try {
// Mengambil id dari parameter URL & memvalidasi apakah id berbentuk valid MongoDB ObjectId sebelum melakukan pencarian di db
	const { id } = req.params;
	const seats = [];
// looping utk tmpat duduk sebanyak 5 dan 3 baris
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
// Mencari data film berdasarkan id dengan relasi ke theaters dan genre.
// populate digunakan untuk mengambil data dari relasi theater(name, city) dan genre(name)
		const movie = await Movie.findById(id)
		.populate({
			path: "theaters",
			select: "name city",
		})
		.populate({
			path: "genre",
			select: "name -_id",
		});
// jam  tayang
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

// get available Seats
export const getAvailableSeats = async (req: Request, res: Response) => {
	try {
// Mengambil parameter movieId dari URL dan query date dari request
	const { movieId } = req.params;
	const { date } = req.query;
// Query database untuk transaksi berdasarkan tanggal dan film
		const transactions = await Transaction.find({
// Memastikan format tanggal diubah dengan replace "+" menjadi spasi
		date: date?.toString().replace("+", " "),
		movie: movieId, // Filter berdasarkan movieId
		}).select("seats").populate({  // Mengambil hanya properti "seats" untuk efisiensi
			path: "seats",
			select: "seat"
		})

		const seats = []; // Array utk menampung semua kursi yang ditemukan
// Looping untuk menggabungkan kursi dari setiap transaksi
		for(const seat of transactions) {
			seats.push(...seat.seats); // Spread operator digunakan untuk menambahkan semua kursi
		}

// Mengembalikan data kursi yang ditemukan dalam respons JSON
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

// API utk filter movie
export const getMoviesFilter = async (req: Request, res: Response) => {
	try {
// Mengambil parameter `genreId` dari URL dan `city`, `theaters`, serta `availability` dari query string
	const { genreId } = req.params;
	const { city, theaters, availbility } = req.query;
	let filterQuery: any = {}; // Objek untuk menyimpan filter query

// Filter berdasarkan genre
	if (genreId) {
		filterQuery = {
			...filterQuery, // Menjaga filter sebelumnya
			genre: genreId, // Menambahkan filter berdasarkan genreId
		};
	}

	if (city) {
// Mencari daftar teater berdasarkan kota
	const theaters_lists = await Theater.find({
		city: city,
	});

	// Mendapatkan daftar ID dari teater yang ditemukan
	const theaterIds = theaters_lists.map((the) => the.id);

	filterQuery = {
		...filterQuery,
		theaters: {
			$in: [...theaterIds],
		},
	};
	}

	if (theaters) {
		const theaterIds2 = theaters as string[]; // Mengonversi query theaters ke array string

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
// Mengambil semua data film tanpa filter untuk perbandingan
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

	

			



		



