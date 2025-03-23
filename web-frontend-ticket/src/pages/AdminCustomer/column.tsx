
import type { User } from "@/services/customer/customer.type";
import type { ColumnDef } from "@tanstack/react-table";

// disini kita buat field column dan tidak ada untuk add user, karena user akan register sendiri
export const columns: ColumnDef<User>[] = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},

];

