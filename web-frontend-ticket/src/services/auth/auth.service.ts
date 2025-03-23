// utk endpoint dan validasi schema

import { BaseResponse } from "@/types/response";
import {z} from "zod";
import { LoginResponse } from "./auth.type";
import { globalInstance } from "@/lib/axios";

// Skema validasi untuk data otentikasi menggunakan ZodSchema folder beckend
export const authSchema = z.object({
    name: z.string().min(5),
    email: z.string().email(),
    password: z.string().min(5),
    role: z.enum(["admin", "customer"]),
});

// schema validasi signup, role ga dipanggil, photo mandatory
export const signUpSchema = authSchema.omit({role: true}).extend({
    photo: z.any().refine((file: File) => file?.name, {message: "Photo is required"})
})

// Skema validasi untuk login, seperti authSchema tapi tanpa properti "name"
export const loginSchema = authSchema.omit({ name: true});

// Tipe TypeScript untuk nilai-nilai login, regist berdasarkan loginSchema
export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof signUpSchema>;

// Fungsi login untuk mengirimkan data login ke endpoint "/auth/login"
// Data dikirim menggunakan metode POST melalui globalInstance Axios
export const login = async (
	data: LoginValues,
): Promise<BaseResponse<LoginResponse>> =>
	globalInstance.post("/auth/login", data).then((res) => res.data); // Mengembalikan data dari respon server

// tambahin service signup buat get ke api register
export const signup = async (data: FormData) =>
    globalInstance.post("/auth/register", data).then(res => res.data);
