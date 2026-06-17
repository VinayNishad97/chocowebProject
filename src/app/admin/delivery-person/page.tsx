"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./column";
import { useQuery } from "@tanstack/react-query";
import { getAlldeliveryPerson } from "../../http/api";
import { DeliveryPerson } from "@/src/types";

import ProductSheet from "./delivery-person-sheet";
import SkeletonTable from "@/src/skeletons/products-skeliton";
import { useNewProduct } from "@/src/store/products/product-store";
export default function Products() {
    const { onOpen } = useNewProduct();
    const {
        data: DeliveryPerson,
        isLoading,
        isError,
    } = useQuery<DeliveryPerson[]>({
        queryKey: ["deliveryperson"],
        queryFn: getAlldeliveryPerson,
    });

    return (
        <>
            <div className="flex justify-between items-center">
                <h1>Delivery-Person</h1>
                <Button size={"sm"} onClick={onOpen}>
                    Add Delivery-Person
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
                <DataTable columns={columns} data={DeliveryPerson ?? []} />
            )}
        </>
    );
}
