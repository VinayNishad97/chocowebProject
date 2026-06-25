"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import { Order } from "@/src/types";
import { columns } from "./_components/column";
import SkeletonTable from "@/src/skeletons/products-skeliton";

import { GetOrders } from "../../http/orders-api";
import { DataTable } from "./_components/data-table";

export default function Orders() {
    const {
        data: order,
        isLoading,
        isError,
    } = useQuery<Order[]>({
        queryKey: ["order"],
        queryFn: GetOrders,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Orders</h1>
            </div>
            {isError && (
                <span className="text-red-500">Something Went Wrong</span>
            )}
            {isLoading ? (
                <div>
                    <SkeletonTable />
                </div>
            ) : (
                <DataTable columns={columns} data={order ?? []} />
            )}
        </>
    );
}
