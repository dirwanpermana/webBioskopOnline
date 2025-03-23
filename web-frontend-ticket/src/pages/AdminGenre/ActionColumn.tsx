// file utk action fungsi Edit Genre
import { Button } from "@/components/ui/button";
import { deleteGenre } from "@/services/genre/genre.service";
import { useMutation } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "sonner";

// Props yang digunakan untuk menentukan ID genre yg akan diedit / dihapus.
interface ActionColumnProps{
    id: string;
}

// definisikan props id disini
export default function ActionColumn({ id }: ActionColumnProps) {
    const {isPending, mutateAsync} = useMutation({
        mutationFn: () => deleteGenre(id) //mutationFn:memanggil deleteGenre(id) utk hapus genre sesuai ID
    });
// useRevalidator: Digunakan untuk merefresh data di halaman setelah operasi delete.
    const revalidator = useRevalidator(); 

    const handleDelete = async () => {
        try {
            await mutateAsync() //mutateAsync untuk mengeksekusi menghapus genre

            revalidator.revalidate()
// toast:Library sonner utk menampilkan notifikasi
            toast.success("Data succesfully deleted");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
    return (
        <div className="inline-flex items-center gap-4 p-5">
{/* ketika klik button edit redirect ke halaman edit genre */}
            <Button size="sm" variant="secondary" asChild>
                <Link to={`/admin/genres/edit/${id}`}>
                    <Edit className="w-4 h-4 mr-2" />
                        Edit
                </Link>
            </Button>
{/* tampilin button delete */}
            <Button
				isLoading={isPending}
				onClick={handleDelete}
				size="sm"
				variant="destructive"
			>
				<Trash className="w-4 h-4 mr-2" />
				Delete
			</Button>
        </div>
    )
}