import type {Request, Response} from "express"; //untuk nge get api film
import Genre from "../models/Genre"
import { genreSchema } from "../utils/zodSchema";
import bodyParser from "body-parser";


// get data
export const getGenres = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find();

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
}

// get genre detail
export const getGenreDetail = async (req: Request, res: Response) => {
    try {
        const {id} =req.params; //parameter id
        const genre = await Genre.findById(id);

        return res.json({
            data: genre,
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
}

// Post Data fungsi untuk pembuatan data. setelah buat code dibawah ini, tambahin di genreROutes
export const postGenre = async (req:Request, res:Response)=> {
    try {
// create data
        const body = genreSchema.parse(req.body);
        const genre = new Genre({
            name: body.name,
        });

        const newData = await genre.save();

        return res.json({
            message: "Success post data",
            data: newData,
            status: "Success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to post data",
            data: null,
            status: "failed",
        });
    }
}

// Update Data
export const putGenre = async (req:Request, res:Response)=> {
    try {
        const {id} = req.params //karena update data jadi kitta perlu dapatkan id. jadi nanti nya ada genre/id
        const body = genreSchema.parse(req.body);

// panggil model nya genre cari id dan update. kemudian yg di update name kemudian update value name nya
        await Genre.findByIdAndUpdate(id, {
            name: body.name
        })
//disini kita buat variabel untuk return data yg di update
        const updatedData = await Genre.findById(id)

        return res.json({
            message: "Success update data",
            data: updatedData, //panggil variabel updateData
            status: "Success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update data",
            data: null,
            status: "failed",
        });
    }
}

// Delete Data
export const deleteGenre = async (req:Request, res:Response)=> {
    try {
        const {id} = req.params //ambil data id
        const deletedData = await Genre.findById(id);

        await Genre.findByIdAndDelete(id);

        return res.json({
            message: "Success Delete data",
            data: deletedData, //panggil variabel updateData
            status: "Success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to Delete data",
            data: null,
            status: "failed",
        });
    }
}