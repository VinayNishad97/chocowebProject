import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "react-toastify";
import ProductForm, { FormValue } from "./create-product-from";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createproduct } from "../../http/api";
import { useNewProduct } from "@/src/store/products/product-store";
export default function ProductSheet() {
    const { isOpen, onClose } = useNewProduct();
    const queryclient = useQueryClient();
    const { mutate } = useMutation({
        mutationKey: ["create-product"],
        mutationFn: (data: FormData) => createproduct(data),
        onSuccess: () => {
            queryclient.invalidateQueries({ queryKey: ["products"] });
            toast("Product Uploaded SuccesFully");
            alert("success");
        },
    });

    const onSubmit = (value: FormValue) => {
        console.log(value.image as FileList[0]);
        const formdata = new FormData();
        formdata.append("name", value.name);

        formdata.append("price", String(value.price));
        formdata.append("description", value.description);
        const imageFiles = value.image as unknown as FileList;
        if (imageFiles && imageFiles.length > 0) {
            formdata.append("image", imageFiles[0]);
        } else {
            toast.error("Please choose a valid product image");
            return;
        }

        mutate(formdata);
    };
    return (
        <>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Create Product</SheetTitle>
                        <SheetDescription>
                            Create a new Product
                        </SheetDescription>
                    </SheetHeader>
                    <ProductForm onSubmit={onSubmit} />
                </SheetContent>
            </Sheet>
        </>
    );
}
