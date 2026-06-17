"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../http/api";
import { Product } from "@/src/types";

import ProductSheet from "./_components/products-sheet";
import SkeletonTable from "@/src/skeletons/products-skeliton";
import { useNewProduct } from "@/src/store/products/product-store";
export default function Products() {
    const { onOpen } = useNewProduct();
    const {
        data: products,
        isLoading,
        isError,
    } = useQuery<Product[]>({
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
            {isError && (
                <span className="text-red-500">Something Went Wrong</span>
            )}
            {isLoading ? (
                <div>
                    <SkeletonTable />
                </div>
            ) : (
                <DataTable columns={columns} data={products ?? []} />
            )}
        </>
    );
}
