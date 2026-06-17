"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/column";
import { useQuery } from "@tanstack/react-query";
import { getAllwarehouses } from "../../http/api";
import { Warehouse } from "@/src/types";

import ProductSheet from "./_components/warehouse-sheet";
import SkeletonTable from "@/src/skeletons/products-skeliton";
import { useNewProduct } from "@/src/store/products/product-store";
export default function Products() {
    const { onOpen } = useNewProduct();
    const {
        data: Warehouse,
        isLoading,
        isError,
    } = useQuery<Warehouse[]>({
        queryKey: ["warehouses"],
        queryFn: getAllwarehouses,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>WareHouses</h1>
                <Button size={"sm"} onClick={onOpen}>
                    Add Warehouses
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
                <DataTable columns={columns} data={Warehouse ?? []} />
            )}
        </>
    );
}
