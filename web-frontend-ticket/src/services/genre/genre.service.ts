// file ini utk mengelola API Request data genre dari server
import type { BaseResponse } from "@/types/response";
import type { Genre } from "./genre.type";
import { privateInstance } from "@/lib/axios";
import { z } from "zod";

// buat schema utk form add genre
export const genreSchema = z.object({
    name: z.string().min(5),
});

export type GenreValues = z.infer<typeof genreSchema>

// Fungsi ini menggunakan axios instance bernama privateInstance untuk melakukan permintaan GET ke endpoint /admin/genres.
export const getGenres = (): Promise<BaseResponse<Genre[]>> =>
privateInstance.get("/admin/genres").then((res) => res.data);

// integrasi api create genre
export const createGenre = (data: GenreValues) => privateInstance.post("admin/genres", data).then(res => res.data)

// Integrasi API Update Genre --> ambil data detail Genre
export const getDetailGenre = (id: string): Promise<BaseResponse<Genre>> =>
    privateInstance.get(`/admin/genres/${id}`).then((res) => res.data);

// Buat endpoint utk update genre
export const updateGenre = (data: GenreValues, id: string) =>
    privateInstance.put(`/admin/genres/${id}`, data).then((res) => res.data);

// endpoint delete genre
export const deleteGenre = (id: string) =>
    privateInstance.delete(`/admin/genres/${id}`).then((res) => res.data);