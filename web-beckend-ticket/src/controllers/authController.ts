import type { Request, Response } from "express";
import { authSchema } from "../utils/zodSchema";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Wallet from "../models/Wallet";

export const login = async (req: Request, res: Response) => {
  try {
    const parse = authSchema
      .omit({
        name: true,
      })
      .parse(req.body);

    const checkUser = await User.findOne({
      email: parse.email,
      role: parse.role,
    });

    if (!checkUser) {
      return res.status(400).json({
        message: "Email not registered",
        data: null,
        status: "failed",
      });
    }
    // jika data benar nanti di compare password pake bcrypt dan butuh json web token
    const comparePassword = bcrypt.compareSync(
      //compare password yg di input dgn password database checkUser
      parse.password,
      checkUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({
        message: "Email / Password incorrect",
        data: null,
        status: "failed",
      });
    }

    const secretKey = process.env.SECRET_KEY ?? "";

    const token = jwt.sign(
      {
        data: {
          id: checkUser.id,
        },
      },
      //expired 24h ganti jadi 7 day
      secretKey,
      { expiresIn: "24h" }
    );

    return res.json({
      message: "Success login",
      data: {
        name: checkUser.name,
        email: checkUser.email,
        role: checkUser.role,
        photoUrl: checkUser.photoUrl,
        token,
      },
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to login",
      data: null,
      status: "failed",
    });
  }
};

// Register Customer
export const register = async (req: Request, res: Response) => {
  try {
    // Validasi data input menggunakan authSchema tanpa properti "role"
    const parse = authSchema
      .omit({
        role: true,
      })
      .safeParse(req.body);
    // Jika validasi gagal, return respon dengan status 400
    if (!parse.success) {
      const errorMessages = parse.error.issues.map((err) => err.message);

      return res.status(400).json({
        message: "Invalid request",
        data: errorMessages,
        status: "failed",
      });
    }
    // validasi email ada/tidak di database
    const emailExisted = await User.findOne({
      email: parse.data.email,
    });

    if (emailExisted) {
      return res.status(400).json({
        message: "Email already exist",
        data: null,
        status: "failed",
      });
    }
    // Enkripsi password dengan bcrypt dan salt rounds 12
    const hashPassword = bcrypt.hashSync(parse.data.password, 12);

    const user = new User({
      name: parse.data.name,
      email: parse.data.email,
      password: hashPassword,
      role: "customer",
      photo: req.file?.filename,
    });
    // Buat wallet baru untuk user dengan saldo awal 0
    const wallet = new Wallet({
      balance: 0,
      user: user._id,
    });
    // Simpan data user dan wallet ke database
    await user.save();
    await wallet.save();
    // Kembalikan respon sukses dengan nama dan email user
    return res.json({
      message: "Success sign up",
      data: {
        name: user.name,
        email: user.email,
      },
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register",
      data: null,
      status: "failed",
    });
  }
};
