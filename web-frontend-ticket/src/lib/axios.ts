import axios from "axios";
import { getSession } from "./utils";

// Mengambil URL API pada environment (VITE_API_URL). ?? jika kosong balikin null
const baseUrl = import.meta.env.VITE_API_URL ?? "";

// Membuat instans global axios dengan pengaturan default:
export const globalInstance = axios.create({
	baseURL: baseUrl,
	timeout: 5000, //waktu tunggu 10 second
});

// buat instans axios untuk permintaan privat autentikasi dan tambah header token
export const privateInstance = axios.create({
	baseURL: baseUrl,
	timeout: 7000,
});

// Menambahkan interceptor ke privateInstance untuk menyisipkan token ke header Authorization sebelum setiap permintaan:
privateInstance.interceptors.request.use((config) => {
	const session = getSession();

	config.headers.Authorization = `JWT ${session?.token}`;

	return config;
});	