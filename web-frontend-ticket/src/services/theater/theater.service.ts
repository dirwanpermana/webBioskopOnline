// file ini utk mengelola API Request data genre dari server
import type { BaseResponse } from "@/types/response";
import { privateInstance } from "@/lib/axios";
import { z } from "zod";
import type { Theater } from "./theater.type";

// buat schema utk form add genre
export const theaterSchema = z.object({
	name: z.string().min(3),
	city: z.string({ required_error: "Please select a theater city location" }),
});

export type TheaterValues = z.infer<typeof theaterSchema>

// Fungsi privateInstance untuk melakukan GET ke endpoint /admin/theaters. dan pilih role, default ny admin
export const getTheaters = (type: "admin" | "customer" = "admin"): Promise<BaseResponse<Theater[]>> =>
privateInstance.get(`/${type}/theaters`).then((res) => res.data);

// integrasi api create theater
export const createTheater = (data: TheaterValues) => privateInstance.post("admin/theaters", data).then(res => res.data)

// Integrasi API Update theateer --> ambil data detail theater
export const getDetailTheater = (id: string): Promise<BaseResponse<Theater>> =>
    privateInstance.get(`/admin/theaters/${id}`).then((res) => res.data);

// Buat endpoint utk update theater
export const updateTheater = (data: TheaterValues, id: string) =>
    privateInstance.put(`/admin/theaters/${id}`, data).then((res) => res.data);

// endpoint delete theater
export const deleteTheater = (id: string) =>
    privateInstance.delete(`/admin/theaters/${id}`).then((res) => res.data);