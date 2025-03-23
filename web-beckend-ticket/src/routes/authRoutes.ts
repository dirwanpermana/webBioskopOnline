// file utk
import express from "express";
import { login, register } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { authSchema } from "../utils/zodSchema";
import multer from "multer";
import { imageFilter, thumbnailStorage } from "../utils/multer";

const authRoutes = express.Router(); // Membuat instance router untuk rute autentikasi

// Mengonfigurasi Multer untuk upload file
const upload = multer({
  storage: thumbnailStorage("public/uploads/photos"),
  fileFilter: imageFilter, // Filter untuk memastikan file yang diunggah adalah gambar
});

// Middleware validasi input tanpa properti "name"
authRoutes.post(
  "/auth/login",
  validateRequest(authSchema.omit({ name: true })),
  login
);
authRoutes.post("/auth/register", upload.single("photo"), register);
// Mengekspor router agar bisa digunakan di tempat lain
export default authRoutes;
