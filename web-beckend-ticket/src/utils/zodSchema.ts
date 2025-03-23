// untuk memvalidasi, dan hanya menerima json name dengan minimal 5 karakter, jika selain itu akan error
import z from "zod";

// extensi yg dibolehkan untuk upload gambar dari movie kita
export const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
// genreSchema untuk data nya kita ambil dari genre model
export const genreSchema = z
  .object({
    name: z.string().min(5),
  })
  .strict(); //supaya tidak ada field lain selain yang kita set
// theaterSchema utk data nya kita ambil dari theater model
export const theaterSchema = z
  .object({
    name: z.string().min(3),
    city: z.string().min(5),
  })
  .strict();
// movieSchema untuk data nya kita ambil dari movie model
export const movieSchema = z
  .object({
    title: z.string().min(5),
    genre: z.string().min(5),
    theaters: z.array(z.string().min(5)).min(1),
    available: z.boolean(),
    description: z.string().min(5).optional(),
    price: z.number(),
    bonus: z.string().optional(),
  })
  .strict();
// untuk bisa request ke authControllers
export const authSchema = z.object({
  name: z.string().min(5),
  email: z.string().email(),
  password: z.string().min(5),
  role: z.enum(["admin", "customer"]),
});
// topupSchema untuk api topup ballance
export const topupSchema = z.object({
  balance: z.number().min(1000),
});
// Transaction Schema utk API pembelian tiket
export const transactionSchema = z
  .object({
    subtotal: z.number(),
    total: z.number(),
    bookingFee: z.number(),
    tax: z.number(),
    movieId: z.string(),
    theaterId: z.string(),
    seats: z.array(z.string()),
    date: z.string(),
  })
  .strict(); //strict(selain req diatas akan error)
