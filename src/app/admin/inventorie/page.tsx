"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "./_component/data-table";
import { columns } from "./_component/column";
import { useQuery } from "@tanstack/react-query";
import { getAllInventories } from "../../http/api";
import { Inventories } from "@/src/types";

import ProductSheet from "./_component/inventorie-sheet";
import SkeletonTable from "@/src/skeletons/products-skeliton";
import { useNewProduct } from "@/src/store/products/product-store";
export default function Products() {
    const { onOpen } = useNewProduct();
    const {
        data: Inventory,
        isLoading,
        isError,
    } = useQuery<Inventories[]>({
        queryKey: ["inventories"],
        queryFn: getAllInventories,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Inventorie</h1>
                <Button size={"sm"} onClick={onOpen}>
                    Add Inverntorie
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
                <DataTable columns={columns} data={Inventory ?? []} />
            )}
        </>
    );
}
