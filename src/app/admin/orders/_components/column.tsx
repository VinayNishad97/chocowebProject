import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/src/types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "id",
        header: "ID",
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
    {
        id: "actions",
        accessorKey: "id",
        header: "Action",

        cell: ({ row }: any) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(row.id)
                            }
                        >
                            Copy Order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View Order details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
