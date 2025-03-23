import type { Request, Response } from "express";
import Genre from "../models/Genre";
import { genreSchema } from "../utils/zodSchema";

// get data genres
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
};

// get genre detail
export const getGenreDetail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

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
};

// Post Data fungsi untuk pembuatan data. setelah buat code dibawah ini, tambahin di genreRoutes
export const postGenre = async (req: Request, res: Response) => {
  try {
    // create data
    const body = genreSchema.parse(req.body);
    const genre = new Genre({
      name: body.name,
    });
    // Update Data
    const newData = await genre.save();

    return res.json({
      message: "Success create data",
      data: newData,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to create data",
      data: null,
      status: "failed",
    });
  }
};

export const putGenre = async (req: Request, res: Response) => {
  try {
    //karena update data jadi kitta perlu dapatkan id. jadi nanti nya ada genre/id
    const { id } = req.params;
    const body = genreSchema.parse(req.body);

    await Genre.findByIdAndUpdate(id, {
      name: body.name,
    });
    // panggil model nya genre cari id dan update. kemudian yg di update name kemudian update value name nya
    const updatedData = await Genre.findById(id);

    return res.json({
      message: "Success update data",
      data: updatedData,
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to update data",
      data: null,
      status: "failed",
    });
  }
};
// Delete Data
export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedData = await Genre.findById(id);

    await Genre.findByIdAndDelete(id);

    return res.json({
      message: "Success delete data",
      data: deletedData, //panggil variabel updateData
      status: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to delete data",
      data: null,
      status: "failed",
    });
  }
};
