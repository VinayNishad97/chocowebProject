import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import ProductForm from "./create-inventorie-form";
import { FormValue } from "./create-inventorie-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "@/src/app/http/inventory-api";
import { useNewProduct } from "@/src/store/products/product-store";
import { toast } from "sonner";
export default function ProductSheet() {
    const { isOpen, onClose } = useNewProduct();
    const queryclient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["create-inventory"],
        mutationFn: (data: FormValue) => createInventory(data),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["inventorie"] });
            onClose();

            toast("New Inventory Uploaded SuccesFully", {
                position: "top-center",
            });
        },
    });

    const onSubmit = (value: FormValue) => {
        mutate(value);
    };
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Inventory</SheetTitle>
                        <SheetDescription>
                            Add in the Inventorie
                        </SheetDescription>
                    </SheetHeader>
                    <ProductForm onSubmit={onSubmit} isdisable={isPending} />
                </SheetContent>
            </Sheet>
        </>
    );
}
