import { cn } from "@/lib/utils";
import {
  type RegisterValues,
  signup,
  signUpSchema,
} from "@/services/auth/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function CustomerSignUp() {
  // define use form, kita butuh beberapa variabel berikut
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  //utk hit ke beckend
  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormData) => signup(data),
  });

  // var utk upload poto, inputRef dimanfaatkan utk triger dari input file
  const inputRef = useRef<HTMLInputElement>(null);
  const photo = watch("photo");

  // buat fungsi onSubmit
  const onSubmit = async (val: RegisterValues) => {
    try {
// Membuat FormData agar data dapat dikirim dalam format multipart/form-data
      const formData = new FormData(); 
// Menambahkan field-field yang dibutuhkan ke dalam formData
      formData.append("name", val.name);
      formData.append("email", val.email);
      formData.append("password", val.password);
      formData.append("photo", val.photo);

// Menjalankan proses signup melalui mutateAsync
// mutateAsync akan memanggil signup(formData)
      await mutateAsync(formData);

      navigate("/sign-in"); //kalo berhasil sign up redirect login
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
          src="/assets/images/backgrounds/register.jpeg"
          className="w-full h-full object-cover"
          alt="background"
        />
      </div>
      <img
        src="/assets/images/logos/logo.svg"
        className="relative flex max-w-[188px] mx-auto mt-[60px]"
        alt="logo"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-[30px] px-5 py-[60px] my-auto"
      >
        <h1 className="font-bold text-[26px] leading-[39px]">Sign Up</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-5">
            <label className="relative flex w-[100px] h-[100px] shrink-0 rounded-full overflow-hidden bg-[#FFFFFF33] backdrop-blur-sm">
              <button
                type="button"
                onClick={() => inputRef?.current?.click()} //ketika di klik akan triger ke inputRef buka file explorer
                id="Text-Label"
                // agar gambar tampil ful layar pake cn dari utils
                className={cn(
                  "w-full h-full flex items-center justify-center text-center font-semibold",
                  photo !== undefined ? "hidden" : "block" //kalo photo ada tampil poto, !== tampil add photo
                )}
              >
                Add <br />
                Photo
              </button>
              {/* kalo photo tidak undefine tampilkan preview  */}
              {photo !== undefined && (
                <img
                  id="Avatar-Preview"
                  src={URL.createObjectURL(photo)} //link poto
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
              )}
              <input
                type="file"
                className="absolute bottom-0 -left-3/4 -z-30 opacity-0"
                {...register("photo")}
                ref={inputRef}
                onChange={(e) => {
                  //klo input file simpan di photo
                  if (e.target.files) {
                    setValue("photo", e.target.files[0]);
                  }
                }}
              />
            </label>
            <button
              type="button"
              // ketika klik button set value poto jadi undefined / hapus
              onClick={() => setValue("photo", undefined)}
              className="rounded-full py-2 px-3 bg-[#FFFFFF33] backdrop-blur-sm font-bold text-sm"
            >
              Delete
            </button>
            <p className="text-xs text-red-500">
              {errors.photo?.message?.toString()}
            </p>
          </div>
          <label className="flex flex-col gap-2">
            <p>Complete Name</p>
            <input
              type="text"
              className="appearance-none outline-none rounded-full py-3 px-[18px] bg-[#FFFFFF33] backdrop-blur-sm font-semibold placeholder:font-normal placeholder:text-white focus:ring-1 focus:ring-white transition-all duration-300"
              placeholder="What’s your name"
              {...register("name")}
            />
            <p className="text-xs text-red-500">{errors.name?.message}</p>
          </label>
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
            disabled={isPending}
            type="submit"
            className="w-full rounded-full py-3 px-[18px] bg-white text-center font-bold text-premiere-black"
          >
            Create New Account
          </button>
          <Link
            to="/sign-in"
            className="w-full rounded-full py-3 px-[18px] bg-white/10 text-center font-bold"
          >
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
