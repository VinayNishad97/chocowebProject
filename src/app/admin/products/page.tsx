"use client";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../http/api";
import { Product } from "@/src/types";

import ProductSheet from "./products-sheet";
import SkeletonTable from "@/src/skeletons/products-skeliton";
import { useNewProduct } from "@/src/store/products/product-store";
export default function Products() {
    const { onOpen } = useNewProduct();
    const { data: products } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Products</h1>
                <Button size={"sm"} onClick={onOpen}>
                    Add Product
                </Button>
                <ProductSheet />
            </div>
            <Suspense fallback={<SkeletonTable />}>
                <DataTable columns={columns} data={products ?? []} />
            </Suspense>
        </>
    );
}
