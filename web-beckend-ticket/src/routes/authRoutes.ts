import express from "express";
import { login, register } from "../controllers/authController";
import { validateRequest } from "../middlewares/validateRequest";
import { authSchema } from "../utils/zodSchema";
import multer from "multer";
import { imageFilter, thumbnailStorage } from "../utils/multer";

const authRoutes = express.Router();

const upload = multer({
	storage: thumbnailStorage("public/uploads/photos"),
	fileFilter: imageFilter,
});

authRoutes.post(
	"/auth/login",
	validateRequest(authSchema.omit({ name: true })),
	login,
);
authRoutes.post("/auth/register", upload.single("photo"), register);

export default authRoutes;
