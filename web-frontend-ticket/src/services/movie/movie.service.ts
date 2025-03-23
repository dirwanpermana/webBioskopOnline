// file ini utk mengelola API Request data genre dari server
import type { BaseResponse } from "@/types/response";
import { privateInstance } from "@/lib/axios";
import { z } from "zod";
import { Movie } from "./movie.type";


// buat schema utk form add movie
export const movieSchema = z.object({
    title: z.string().min(5),
    genre: z.string().min(5),
    theaters: z.array(z.string().min(5)).min(1),
    available: z.boolean().optional(),
    description: z.string().min(5).optional(),
    price: z.string(), //di file form diubah toString
    bonus: z.string().optional(),
    thumbnail: z.any().refine((file: File) => file?.name, {
        message: "Please upload a thumbnail",
    }),
});

export type MovieValues = z.infer<typeof movieSchema>

// Fungsi ini menggunakan axios instance bernama privateInstance untuk melakukan request GET ke endpoint /admin/movies.
export const getMovies = (): Promise<BaseResponse<Movie[]>> =>
privateInstance.get("/admin/movies").then((res) => res.data);

// integrasi api create Movie
export const createMovie = (data: FormData) => 
    privateInstance.post("/admin/movies", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(res => res.data);

// Integrasi API Update Movie --> ambil data detail Movie
export const getDetailMovie = (id: string): Promise<BaseResponse<Movie>> =>
    privateInstance.get(`/admin/movies/${id}`).then((res) => res.data);

// Buat endpoint utk update Movie
export const updateMovie = (data: FormData, id: string) =>
    privateInstance.put(`/admin/movies/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    }).then(res => res.data);

// endpoint delete Movie
export const deleteMovie = (id: string) =>
    privateInstance.delete(`/admin/movies/${id}`).then((res) => res.data);