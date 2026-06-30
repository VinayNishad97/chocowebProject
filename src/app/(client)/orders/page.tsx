"use client";

import Nav from "../_components/nav";
import Offer from "../_components/offers";
import { useQuery } from "@tanstack/react-query";

import { Order } from "@/src/types";
import { columns } from "./_components/column";
import SkeletonTable from "@/src/skeletons/products-skeliton";

import { GetOrders } from "../../http/orders-api";
import { DataTable } from "./_components/data-table";
import { useSession } from "next-auth/react";

export default function Orders() {
    const session = useSession();
    const userId = Number(session.data?.user.id);

    const filtredOrder: any = [];
    const {
        data: order,
        isLoading,
        isError,
    } = useQuery<Order[]>({
        queryKey: ["order"],
        queryFn: GetOrders,
    });
    order?.map((o) => (o.userId == userId ? filtredOrder.push(o) : undefined));

    return (
        <>
            <Offer />
            <Nav />

            <div className="flex items-center justify-center gap-5 mb-4">
                <div className="h-0.5 w-5 bg-amber-700 shrink-0" />

                <h1 className="text-3xl font-bold tracking-tight text-amber-700">
                    Orders
                </h1>

                <div className="h-0.5 w-5 bg-amber-700 shrink-0" />
            </div>
            {isError && (
                <span className="text-red-500">Something Went Wrong</span>
            )}
            {isLoading ? (
                <div>
                    <SkeletonTable />
                </div>
            ) : (
                <DataTable columns={columns} data={filtredOrder ?? []} />
            )}
        </>
    );
}
