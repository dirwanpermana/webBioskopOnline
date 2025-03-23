// file ini utk menambah type request bawaan dari express, 
import type {Request} from "express";

type User ={
    id: string;
    name: string;
    role: "admin" | "customer";
    email: string;
};
// Menambahkan properti user ke objek request, memungkinkan middleware atau controller menyisipkan informasi pengguna
export interface CustomRequest extends Request{
    user?: User;
}