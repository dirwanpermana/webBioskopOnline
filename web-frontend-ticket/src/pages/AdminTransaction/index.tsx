import TitleHeading from "@/components/TitleHeading";
import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { useLoaderData } from "react-router-dom";
import type { Transaction } from "@/services/customer/customer.type";
import { columns } from "./column";

/*
export default function AdminTransactions() {
	const transactions = useLoaderData() as Transaction[];
  
	return (
		<>
    <TitleHeading title="List Transactions" />
    <div>
    <DataTable columns={columns} data={transactions} />
    </div>
		</>
    );
    }*/
   
   
   export default function AdminTransactions() {
    //  const transactions = useLoaderData() as Transaction[];

     // Ambil data dari loader dan pastikan selalu array
     const rawTransactions = useLoaderData() as Transaction;
  const transactions = Array.isArray(rawTransactions) ? rawTransactions : [];

  // Debugging: Cek data yang diterima
  console.log("Transactions Data:", transactions);

  return (
    <>
      <TitleHeading title="List Transactions" />
      <div>
        <DataTable columns={columns} data={transactions} />
      </div>
    </>
  );
}
