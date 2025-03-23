import type {Request, Response} from "express"; //untuk nge get api film
import bodyParser from "body-parser";
import Theater from "../models/Theater";
import { theaterSchema } from "../utils/zodSchema";

// get data theater
export const getTheaters = async (req: Request, res: Response) => {
    try {
        const theaters = await Theater.find();

        return res.json({
            data: theaters,
            message: "Success get data theaters",
            status: "Success",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get data theaters",
            data: null,
            status: "failed",
        });
    }
}

// get theater detail
export const getTheaterDetail = async (req: Request, res: Response) => {
    try {
        const {id} =req.params; //parameter id
        const theater = await Theater.findById(id);

        return res.json({
            data: theater,
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

// Post Data fungsi untuk insert data. setelah buat code dibawah ini, tambahin di theaterRoutes
export const postTheater = async (req:Request, res:Response)=> {
    try {
// create data
        const body = theaterSchema.parse(req.body);
        const theater = new Theater({
            name: body.name,
            city: body.city, 
        });

        const newData = await theater.save();

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

// Update data Theater
export const putTheater = async (req:Request, res:Response)=> {
    try {
        const {id} = req.params //karena update data jadi kitta perlu dapatkan id. jadi nanti nya ada genre/id
        const body = theaterSchema.parse(req.body);

// panggil model nya genre cari id dan update. kemudian yg di update name kemudian update value name nya
        await Theater.findByIdAndUpdate(id, {
            name: body.name
        })
//disini kita buat variabel untuk return data yg di update
        const updatedData = await Theater.findById(id)

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
export const deleteTheater = async (req:Request, res:Response)=> {
    try {
        const {id} = req.params //ambil data id
        const deletedData = await Theater.findById(id);

        await Theater.findByIdAndDelete(id);

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