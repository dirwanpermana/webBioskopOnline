import type { LoginResponse } from "@/services/auth/auth.type";
import { clsx, type ClassValue } from "clsx"
import secureLocalStorage from "react-secure-storage";
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs'

export const SESSION_KEY = "SESSION_KEY"; //KEY utk save response login
export const LOCATION_OPTIONS = ["Aceh", "Brebes", "Bandung", "Jakarta", "Semarang", "Surabaya", "Medan", "Yogyakarta",];


// css dan tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Jika session kosong akan redirect ke login page
// getSession baca data dari secureLocalStorage berdasarkan session_key
export function getSession() {
  const session = secureLocalStorage.getItem(SESSION_KEY) as LoginResponse;
  if (!session) {
    return null;
  }
  return session;
}

// buat fungsi format rupiah
export function rupiahFormat(val: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

// function DateFormat dengan dayjs
export function dateFormat(val: Date | string, format = "DD-MMM-YYYY HH:mm") {
	return dayjs(val).format(format);
}