// file utk action fungsi Edit dan hapus theater 
import { Button } from "@/components/ui/button";
import { deleteTheater } from "@/services/theater/theater.service";
import { useMutation } from "@tanstack/react-query";
import { Edit, Trash } from "lucide-react";
import React from "react";
import { Link, useRevalidator } from "react-router-dom";
import { toast } from "sonner";

// Props yang digunakan untuk menentukan ID theater yg akan diedit / dihapus.
interface ActionColumnProps{
    id: string;
}

// definisikan props id disini
export default function ActionColumn({ id }: ActionColumnProps) {
    const {isPending, mutateAsync} = useMutation({
        mutationFn: () => deleteTheater(id) //mutationFn:memanggil deletetheater(id) utk hapus theater sesuai ID
    });
// useRevalidator: Digunakan untuk merefresh data di halaman setelah operasi delete.
    const revalidator = useRevalidator(); 

    const handleDelete = async () => {
        try {
            await mutateAsync() //mutateAsync untuk mengeksekusi menghapus theater

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
{/* ketika klik button edit redirect ke halaman edit theater */}
            <Button size="sm" variant="secondary" asChild>
                <Link to={`/admin/theaters/edit/${id}`}>
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