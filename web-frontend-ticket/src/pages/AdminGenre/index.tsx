import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Plus } from "lucide-react";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { columns } from "./columns";
import TitleHeading from "@/components/TitleHeading";
import type { Genre } from "@/services/genre/genre.type";

export default function AdminGenre() {
    const genres = useLoaderData() as Genre[];
    
    return (
    <>
        <TitleHeading title="List Genre" /> {/*heading title props dari TittleHeading*/}
        <div>
{/* Button Tambah data genre, plus = tanda + */}
        <Button asChild className="mb-3">
            <Link to="/admin/genres/create">
            <Plus className="w-4 h-4 mr-2" /> Add Data
            </Link>
        </Button>
{/* Menampilkan data genre dalam tabel menggunakan komponen DataTable */}
        <DataTable columns={columns} data={genres} />
    </div>
    </>
    )
}