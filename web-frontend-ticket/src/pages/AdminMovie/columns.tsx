import { Badge } from "@/components/ui/badge";
import { rupiahFormat } from "@/lib/utils";
import type { Movie } from "@/services/movie/movie.type";
import type { ColumnDef } from "@tanstack/react-table";
import ActionColumn from "./ActionColumn";
// import ActionColumn from "./ActionColumn";

// Definisi kolom tabel berdasarkan tipe data Movie
export const columns: ColumnDef<Movie>[] = [
	{
// Kolom pertama: Detail Film
		accessorKey: "title",
		header: "Movie Detail",
		cell: ({ row }) => { //Fungsi untuk merender data dlm setiap sel
			const movie = row.original;

			return (
				<div className="inline-flex items-center gap-4">
	{/* Tampilkan thumbnail film */}
					<img
						src={movie.thumbnailUrl}
						alt={movie.thumbnailUrl}
						className="w-[50px]"
					/>
	{/* Tampilkan detail film */}
					<div className="space-y-3">
						<div>
							<h4>{movie.title}</h4>
							<p>{movie.description}</p>
						</div>
						<p>Bonus: {movie.bonus}</p>
{/* kalo movie avaliable true nampilin default dan teks live now
kalo false tampil destructive ddan coming soon */}
						<Badge variant={movie.available ? "default" : "destructive"}>
							{movie.available ? "Live Now" : "Coming Soon"}
						</Badge>
					</div>
				</div>
			);
		},
	},
// Kolom kedua: Harga film
	{
		accessorKey: "price",
		header: "Price",
		cell: ({ row }) => rupiahFormat(row.original.price),
	},
// Kolom ketiga: Genre film
	{
		accessorKey: "genre",
		header: "Genre",
		cell: ({ row }) => (
			<Badge variant="secondary">{row.original.genre.name}</Badge>
		),
	},
// Kolom keempat: Teater tempat film diputar
	{
		accessorKey: "theaters",
		header: "Theaters",
		cell: ({ row }) => {
			const movie = row.original;

			return (
				<div className="flex flex-col items-center gap-4">
{/* Iterasi untuk menampilkan setiap teater */}
					{movie.theaters.map((item) => (
						<Badge variant="outline" key={item._id}>
							{item.name}
						</Badge>
					))}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const movie = row.original;

			return <ActionColumn id={movie._id} />;
		},
	},
];
