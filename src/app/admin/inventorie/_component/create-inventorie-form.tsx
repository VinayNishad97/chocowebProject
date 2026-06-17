import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { Product, Warehouse } from "@/src/types";
import { getAllProducts, getAllwarehouses } from "@/src/app/http/api";
import { inventorySchema } from "@/src/lib/validators/inventorySchema";

export type FormValue = z.input<typeof inventorySchema>;

export default function ProductForm({
    onSubmit,
    isdisable,
}: {
    onSubmit: (formValues: FormValue) => void;
    isdisable: boolean;
}) {
    const { data: warehouses, isLoading } = useQuery<Warehouse[]>({
        queryKey: ["warehousee"],
        queryFn: getAllwarehouses,
    });
    const { data: product } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
    const form = useForm<z.infer<typeof inventorySchema>>({
        resolver: zodResolver(inventorySchema),
        defaultValues: {
            sku: "",
            warehouseId: -1,
            productId: -1,
        },
    });

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Inventory Entry</CardTitle>
                <CardDescription>
                    Enter the inventory and select the corresponding warehouse.
                </CardDescription>
            </CardHeader>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <FieldGroup>
                        <Field>
                            <FieldLabel>SKU</FieldLabel>
                            <Controller
                                name="sku"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Input
                                            {...field}
                                            placeholder="Enter SKU code"
                                            disabled={isdisable}
                                        />
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </>
                                )}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Product ID</FieldLabel>
                            <Controller
                                name="productId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            disabled={isLoading || isdisable}
                                            onValueChange={(val) =>
                                                field.onChange(Number(val))
                                            }
                                            value={
                                                field.value === -1
                                                    ? ""
                                                    : String(field.value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        isLoading
                                                            ? "Loading Product..."
                                                            : "Select a Product"
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {product?.map((wh) => (
                                                    <SelectItem
                                                        key={wh.id}
                                                        value={String(wh.id)}
                                                    >
                                                        {wh.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </>
                                )}
                            />
                        </Field>

                        <Field>
                            <FieldLabel>Warehouse</FieldLabel>
                            <Controller
                                name="warehouseId"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            disabled={isLoading || isdisable}
                                            onValueChange={(val) =>
                                                field.onChange(Number(val))
                                            }
                                            value={
                                                field.value === -1
                                                    ? ""
                                                    : String(field.value)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        isLoading
                                                            ? "Loading warehouses..."
                                                            : "Select a warehouse"
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {warehouses?.map((wh) => (
                                                    <SelectItem
                                                        key={wh.id}
                                                        value={String(wh.id)}
                                                    >
                                                        {wh.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {fieldState.error && (
                                            <FieldError>
                                                {fieldState.error.message}
                                            </FieldError>
                                        )}
                                    </>
                                )}
                            />
                        </Field>
                    </FieldGroup>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isdisable}
                    >
                        {isdisable && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit Inventory
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
