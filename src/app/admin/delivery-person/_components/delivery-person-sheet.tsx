import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import ProductForm, { FormValue } from "./create-warehouse-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryPerson } from "@/src/app/http/deliveryperson-api";
import { useNewProduct } from "@/src/store/products/product-store";
import { toast } from "sonner";
export default function ProductSheet() {
    const { isOpen, onClose } = useNewProduct();
    const queryclient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationKey: ["create-deliveryperson"],
        mutationFn: (data: FormValue) => createDeliveryPerson(data),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["deliveryperson"] });
            onClose();

            toast("Delivery Person Uploaded SuccesFully", {
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
                        <SheetTitle>Add Delivery Person</SheetTitle>
                        <SheetDescription>
                            Add a new Delivery Person
                        </SheetDescription>
                    </SheetHeader>
                    <ProductForm onSubmit={onSubmit} isdisable={isPending} />
                </SheetContent>
            </Sheet>
        </>
    );
}
