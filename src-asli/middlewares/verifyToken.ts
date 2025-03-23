// midleware utk memisahkan token api

import type { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import type { CustomRequest } from "../types/Request";

type JWTPayload = {
	data: { id: string };
};

// verifytoken utk memvalidasi token JWT yg dikirim user melalui header authorization
export const verifyToken = async (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	const secretKey = process.env.SECRET_KEY ?? "";
    
	if (req.headers?.authorization?.split(" ")[0] === "JWT") {
		const token = req.headers?.authorization?.split(" ")[1];
		const decoded = (await jwt.verify(token, secretKey)) as JWTPayload;

		const user = await User.findById(decoded.data.id);
        
        // jika token benar akan ambil id nya, kalo salah tampil error 401
		if (!user) {
			return res.status(401).json({
				message: "Token invalid",
			});
		}

		req.user = {
			id: user.id,
			name: user.name,
			email: user.email,
			role: user.role,
		};

		next();
	} else {
		return res.status(401).json({
			message: "Unauthorized",
		});
	}
};

// veryfyRole akan memferivikasi request sbg admin/customer dan akan membatasi akses role tersebut
export const verifyRole =
	(type: "admin" | "customer") =>
	async (req: CustomRequest, res: Response, next: NextFunction) => {
		if (req?.user?.role === type) {
			next();

			return;
		}

		return res.status(401).json({
			message: "Unauthorized",
		});
	};


