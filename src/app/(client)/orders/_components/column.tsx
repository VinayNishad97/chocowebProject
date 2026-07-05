import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/src/types";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "productsId",
        header: "ProductId",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "qty",
        header: "Quantity",
    },
];
