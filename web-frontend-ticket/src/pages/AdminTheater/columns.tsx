// tampilan kolom tabel theaters
import { Badge } from "@/components/ui/badge"
import type { Theater } from "@/services/theater/theater.type";
import type { ColumnDef } from "@tanstack/react-table"
import ActionColumn from "./ActionColumn";

export const columns: ColumnDef<Theater>[] = [
// tampilin field name, city  yg di ambil dari data theaters.types.ts
    {
      accessorKey: "name",
      header: "Theater",
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({row}) => <Badge>{row.original.city}</Badge>
    },

      {
        id: "actions",
        cell: ({ row }) => {
          const theater = row.original;
    
          return <ActionColumn id={theater._id} />;
        },
      },
    ];

  