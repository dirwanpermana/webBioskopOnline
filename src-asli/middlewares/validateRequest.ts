// Cara kerja validate Request ini akan dipanggil sbelum memanggil contoller kita guna memfilter request nya

import type { NextFunction, Request, Response } from "express";
import type z from "zod";
import { ZodError } from "zod";

export const validateRequest = 
    (schema: z.AnyZodObject) =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    const errorMessages = error.issues.map((err) => err.message);
                    console.log(error);

                    return res.status(500).json({
                        error: "Invalid Request",
                        details: errorMessages,
                    });
                }
                return res.status(500).json({ error: "Internal Server Error"});
            }
        };