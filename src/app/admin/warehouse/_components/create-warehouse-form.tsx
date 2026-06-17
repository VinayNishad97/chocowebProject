import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
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
import { warehouseSchema } from "@/src/lib/validators/warehouseSchema";

export type FormValue = z.input<typeof warehouseSchema>;

export default function ProductForm({
    onSubmit,
    isdisable,
}: {
    onSubmit: (formValues: FormValue) => void;
    isdisable: boolean;
}) {
    const form = useForm<z.infer<typeof warehouseSchema>>({
        resolver: zodResolver(warehouseSchema),
        defaultValues: {
            name: "",
            pincode: "",
        },
    });

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle>WareHouse</CardTitle>
                <CardDescription>
                    Enter The fiels According To Your WareHouse
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
                                        placeholder="Enter The Name of Warehouse"
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
                            name="pincode"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-rhf-demo-price">
                                        Pincode
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        type="string"
                                        id="form-rhf-demo-price"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter The Pincode of WareHouse"
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
