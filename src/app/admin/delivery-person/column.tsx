import { ColumnDef } from "@tanstack/react-table";
import { DeliveryPerson } from "@/src/types";
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

export const columns: ColumnDef<DeliveryPerson>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },

    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "warehouse",
        header: "WareHouse",
    },

    {
        id: "actions",
        accessorKey: "name",
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
                            Copy Delivery-Person ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View DeliveryPerson</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
