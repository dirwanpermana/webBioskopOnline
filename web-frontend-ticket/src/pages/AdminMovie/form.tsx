// file ini untuk fom add data film atau edit data film
import type { Genre } from "@/services/genre/genre.type";
import {
	createMovie,
	movieSchema,
	type MovieValues,
	updateMovie,
} from "@/services/movie/movie.service";
import type { Movie } from "@/services/movie/movie.type";
import type { Theater } from "@/services/theater/theater.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import TitleHeading from "@/components/TitleHeading";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";

type LoaderData = {
	genres: Genre[];
	theaters: Theater[];
	detail: Movie | null;
};

// ketika update data movie thumbnail di set opsional, panggil ini di form
const updateMovieSchema = movieSchema.partial({ thumbnail: true });

export default function AdminMovieForm() {
// Mengambil data awal yang dimuat dari loader
    const { detail, genres, theaters } = useLoaderData() as LoaderData;

	console.log(detail);

// Inisialisasi form,kalo detail tampil->movieSchema(thumbnail mandatori)
// kalo detail null -> updateMovieSchema
	const form = useForm<MovieValues>({
		resolver: zodResolver(detail === null ? movieSchema : updateMovieSchema),
		defaultValues: {
			theaters: detail === null ? [] : detail?.theaters?.map((val) => val._id),
			title: detail?.title,
			available: detail?.available,
			bonus: detail?.bonus,
			genre: detail?.genre?._id,
			description: detail?.description,
			price: detail?.price ? detail.price.toString() : undefined,
		},
	});

// Hook untuk menangani permintaan API create atau update film
	const { isPending, mutateAsync } = useMutation({
		mutationFn: (data: FormData) =>
			detail === null ? createMovie(data) : updateMovie(data, detail?._id),
	});

// Hook untuk menangani permintaan API create atau update film
	const selectedTheaters = form.watch("theaters");

// Menambahkan theater ke daftar yang dipilih
	const handleChangeTheater = (val: string) => {
		if (!selectedTheaters.includes(val)) {
			const newTheaters = [...selectedTheaters, val];

			form.setValue("theaters", newTheaters);
		}
	};
// Menghapus bioskop dari daftar yang dipilih
	const handleRemoveTheater = (val: string) => {
		const updatedTheaters = selectedTheaters.filter((item) => item !== val);

		form.setValue("theaters", updatedTheaters);
	};

	const navigate = useNavigate(); //Hook utk refirect stlah submit berasil

// Fungsi submit form
	const onSubmit = async (val: MovieValues) => {
		try {
			// await mutateAsync(val);

			const formData = new FormData();

			formData.append("available", val.available ? "1" : "0");
			formData.append("genre", val.genre);
			formData.append("theaters", val.theaters.join(","));
			formData.append("title", val.title);
			formData.append("price", val.price.toString());

			if (val?.thumbnail) {
				formData.append("thumbnail", val.thumbnail);
			}

			if (val.description) {
				formData.append("description", val.description);
			}

			if (val.bonus) {
				formData.append("bonus", val.bonus);
			}

		await mutateAsync(formData); //Kirim data ke server

			navigate("/admin/movies");

			toast.success( //notif
				`Movie data successfully ${detail === null ? "created" : "updated"}`,
			);
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong");
		}
	};

	return (
		<>
			<TitleHeading
				title={`${detail === null ? "Create" : "Update"} data movie`}
			/>
{/* Formulir untuk input data film */}
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6 w-1/2"
				>
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Enter title..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

						<FormField
							control={form.control}
							name="thumbnail"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thumbnail</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											onChange={(e) => {
												if (e.target.files) {
													form.setValue("thumbnail", e.target.files[0]);
												}
											}}
											placeholder="Enter name..."
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

                    <FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="Number"
										placeholder="Enter price..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="genre"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Genre</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select movie genre" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
     {/* Melakukan iterasi pada daftar genre dan menampilkan setiap opsi di dalam dropdown. */}
										{genres.map((val, i) => (
											<SelectItem key={`${val._id}`} value={val._id}>
												{val.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="theaters"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Theaters</FormLabel>
								<Select onValueChange={handleChangeTheater}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select movie theaters" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
   {/* Melakukan iterasi pada daftar genre dan menampilkan setiap opsi di dalam dropdown. */}
										{theaters.map((val, i) => (
											<SelectItem key={`${val._id}`} value={val._id}>
												{val.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								{selectedTheaters?.length > 0 && (
									<div className="inline-flex items-center space-x-2">
										{selectedTheaters.map((item, i) => (
											<Badge
												onClick={() => handleRemoveTheater(item)}
												key={`${item + i}`}
											>
												{theaters.find((val) => val._id === item)?.name}
											</Badge>
										))}
									</div>
								)}

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea placeholder="Enter description..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="bonus"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Bonus</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter bonus from buy ticket..."
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="available"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Showing Now</FormLabel>
										</div>
									</FormItem>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

            <Button isLoading={isPending} className="bg-green-500 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                    Submit
              </Button>
              
            <Button variant="secondary" className="ml-2 bg-red-500 hover:bg-red-700 text-white">
                <Link to="/admin/movies">Cancel</Link>
            </Button>
				</form>
			</Form>
		</>
	);
}
