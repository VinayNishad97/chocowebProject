import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
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

import { deliveryPersonSchema } from "@/src/lib/validators/deliveryPersonSchema";
import { useQuery } from "@tanstack/react-query";
import { Warehouse } from "@/src/types";
import { getAllwarehouses } from "../../http/api";

export type FormValue = z.input<typeof deliveryPersonSchema>;

export default function ProductForm({
    onSubmit,
    isdisable,
}: {
    onSubmit: (formValues: FormValue) => void;
    isdisable: boolean;
}) {
    const { data: warehouse, isLoading } = useQuery<Warehouse[]>({
        queryKey: ["warehousee"],
        queryFn: getAllwarehouses,
    });

    const form = useForm<z.infer<typeof deliveryPersonSchema>>({
        resolver: zodResolver(deliveryPersonSchema),
        defaultValues: {
            name: "",
            phone: "",
            warehouseId: "" as any,
        },
    });

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>Delivery Person</CardTitle>
                <CardDescription>
                    Enter The fiels According To Your Delivery Person
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-title">
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-rhf-demo-title"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter The Name of 
                                        Delivery Person"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="phone"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-price">
                                        Phone
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="string"
                                        id="form-rhf-demo-price"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter The Phone Number"
                                        autoComplete="off"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="warehouseId"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-price">
                                        Select Warehouse
                                    </FieldLabel>
                                    <Select
                                        value={
                                            field.value
                                                ? String(field.value)
                                                : ""
                                        }
                                        onValueChange={(value) =>
                                            field.onChange(Number(value))
                                        }
                                        disabled={isLoading}
                                    >
                                        <SelectTrigger className="w-45">
                                            <SelectValue
                                                placeholder={
                                                    isLoading
                                                        ? "Loading warehouses..."
                                                        : "Select a warehouse"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {warehouse?.map((w) => (
                                                    <SelectItem
                                                        key={w.id}
                                                        value={String(w.id)}
                                                    >
                                                        {w.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                    >
                        Reset
                    </Button>
                    <Button type="submit" form="form-rhf-demo">
                        {isdisable ? (
                            <Loader2 className="size-4 animate-spin" />
                        ) : (
                            "Create"
                        )}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}
