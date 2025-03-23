import { SESSION_KEY } from "@/lib/utils";
import {
  login,
  loginSchema,
  type LoginValues,
} from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

export default function CustomerSignIn() {
  // define use form, kita butuh beberapa variabel berikut
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "customer",
    },
  });

  const navigate = useNavigate();
  //utk hit ke beckend
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: LoginValues) => login(data),
  });

  // buat fungsi onSubmit
  const onSubmit = async (val: LoginValues) => {
    try {
      const response = await mutateAsync(val); //isi response = value response
      secureLocalStorage.setItem(SESSION_KEY, response.data);

      navigate("/"); //kalo berhasil sign up redirect login
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="Content-Container"
      className="relative flex flex-col w-full max-w-[640px] min-h-screen mx-auto bg-[linear-gradient(179.86deg,_#000000_40.82%,_#0E0E24_99.88%)] overflow-x-hidden text-white"
    >
      <div id="Background" className="absolute top-0 w-full h-[480px]">
        <div className="absolute w-full h-full top-0 bg-[linear-gradient(359.16deg,_#000000_6.6%,_rgba(14,14,36,0)_99.33%)]" />
        <img
          src="assets/images/backgrounds/login.jpeg"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>
      <img
        src="assets/images/logos/logo.svg"
        className="relative flex max-w-[188px] mx-auto mt-[274px]"
        alt="logo"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-[30px] px-5 py-[60px] my-auto"
      >
        <h1 className="font-bold text-[26px] leading-[39px]">Sign In</h1>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <p>Email Address</p>
            <input
              type="email"
              className="appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300"
              placeholder="What’s your email"
              {...register("email")}
            />
            <p className="text-xs text-red-500">{errors.email?.message}</p>
          </label>
          <label className="flex flex-col gap-2">
            <p>Password</p>
            <input
              type="password"
              className="appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300"
              placeholder="Type your strong password"
              {...register("password")}
            />
            <p className="text-xs text-red-500">{errors.password?.message}</p>
          </label>
        </div>
        <div className="flex flex-col gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-full py-3 px-[18px] bg-white text-center font-bold text-premiere-black"
          >
            Sign In to My Account
          </button>
          <Link
            to="/sign-up"
            className="w-full rounded-full py-3 px-[18px] bg-white/10 text-center font-bold"
          >
            Create New Account
          </Link>
        </div>
      </form>
    </div>
  );
}

// export default CustomerSignIn;
