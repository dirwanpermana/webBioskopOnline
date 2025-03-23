
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import TitleHeading from "@/components/TitleHeading";
import { useLoaderData } from "react-router-dom";
import { User } from "@/services/customer/customer.type";
import { columns } from "./column";

export default function AdminCustomer() {
    const customers = useLoaderData() as User[];
    
    return (
    <>
        <TitleHeading title="List Customers" />
        <div>
{/* Menampilkan data genre dalam tabel menggunakan komponen DataTable */}
        <DataTable columns={columns} data={customers} />
    </div>
    </>
    )
}