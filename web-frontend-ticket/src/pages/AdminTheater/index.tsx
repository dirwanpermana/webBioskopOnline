// file utk theaters
import TitleHeading from "@/components/TitleHeading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Theater } from "@/services/theater/theater.type";

export default function AdminTheater() {
// panggil theater type
    const theaters = useLoaderData() as Theater[];

    return (
        <>
{/* Buat  title,button icon Add data, panggil data table*/}
<TitleHeading title="List Theater" />

		<div>
			<Button asChild className="mb-3">
				<Link to="/admin/theaters/create">
					<Plus className="w-4 h-4 mr-2" />
					Add Data
				</Link>
			</Button>
			<DataTable columns={columns} data={theaters} />
		</div>
		</>
	);
}
