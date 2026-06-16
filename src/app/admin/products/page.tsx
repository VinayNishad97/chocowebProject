"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../http/api";
import { Product } from "@/src/types";
export default function Products() {
    const { data: products } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Products</h1>
                <Button size={"sm"}>Add Product</Button>
            </div>

            <DataTable columns={columns} data={products ?? []} />
        </>
    );
}
