import mongoose from "mongoose";

export default function connectDB() {
	const DATABASE_URL = process.env.DATABASE_URL ?? "";

	try {
		mongoose.connect(DATABASE_URL);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}

	const dbConn = mongoose.connection;

	dbConn.on("open", (_) => {
		console.log(`Database connected: ${DATABASE_URL}`);
	});

	dbConn.on("error", (err) => {
		console.log(`Connection Error: ${err}`);
	});
}
