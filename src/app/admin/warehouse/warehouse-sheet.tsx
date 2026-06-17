import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import ProductForm, { FormValue } from "./create-warehouse-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWarehouse } from "../../http/api";
import { useNewProduct } from "@/src/store/products/product-store";
import { toast } from "sonner";
export default function ProductSheet() {
    const { isOpen, onClose } = useNewProduct();
    const queryclient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["create-warehouse"],
        mutationFn: (data: FormData) => createWarehouse(data),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["warehouses"] });
            onClose();

            toast("Warehouse Uploaded SuccesFully", { position: "top-center" });
        },
    });

    const onSubmit = (value: FormValue) => {
        const formdata = new FormData();
        formdata.append("name", value.name);

        formdata.append("pincode", String(value.pincode));

        mutate(formdata);
    };
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Add Warehouse</SheetTitle>
                        <SheetDescription>Add a new Warehouse</SheetDescription>
                    </SheetHeader>
                    <ProductForm onSubmit={onSubmit} isdisable={isPending} />
                </SheetContent>
            </Sheet>
        </>
    );
}
