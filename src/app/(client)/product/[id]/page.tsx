"use client";

import { getSpecificProduct } from "@/src/app/http/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import Nav from "../../_components/nav";
import { useParams, usePathname } from "next/navigation";
import Offer from "../../_components/offers";
import Image from "next/image";
import RatingExample from "@/components/rating-basic";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { orderSchema } from "@/src/lib/validators/orderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CreateOrder } from "@/src/app/http/orders-api";
import { toast } from "sonner";

export type FormValue = z.infer<typeof orderSchema>;

export default function Page() {
    const params = useParams();

    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const pathname = usePathname();
    const form = useForm<FormValue>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: "",
            pincode: "",
            qty: 1,
            productsId: Number(id),
        },
    });
    const { data: session } = useSession();
    const { mutate, isPending } = useMutation({
        mutationKey: ["create-order"],
        mutationFn: (data: FormValue) => CreateOrder(data),

        onSuccess: () => {
            toast("Order Placed", {
                position: "top-center",
            });
        },
        onError: () => {
            toast("Something went wrong", {
                position: "top-center",
            });
        },
    });
    function onsubmit(values: FormValue) {
        mutate(values);
    }

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["specproduct", id],
        queryFn: () => getSpecificProduct(id!),
        enabled: !!id,
    });

    const qty = form.watch("qty");
    const price = React.useMemo(() => {
        if (product?.price && qty >= 0) {
            return product.price * qty;
        }

        return 0;
    }, [qty, product]);
    return (
        <>
            <Offer />
            <Nav />
            <section className="relative bg-[#f5f5f5]">
                <div className="flex flex-col md:flex-row md:z-50 mx-auto h-full max-w-6xl gap-y-10 md:gap-x-10 px-5 py-14 md:py-20">
                    <div className="flex-1">
                        {isLoading && (
                            <Skeleton className="aspect-square w-md rounded-md object-cover shadow-2xl bg-amber-200" />
                        )}
                        {error && <p>Failed to load product.</p>}

                        {product && (
                            <Image
                                src={`/assets/${product.image}`}
                                alt={product.name || "Product Image"}
                                width={500}
                                height={500}
                                sizes="(max-width: 768px) 100vw, 448px"
                                className="aspect-square w-md rounded-md object-cover shadow-2xl"
                                priority
                            />
                        )}
                    </div>

                    <div className="flex-1">
                        {isLoading ? (
                            <div className="flex flex-col gap-y-2">
                                <Skeleton className="h-4 w-16 bg-amber-200" />
                                <Skeleton className="h-10 w-2/3 bg-amber-200" />
                                <div className="flex items-center gap-x-3">
                                    <div className="flex items-center gap-x-0.5">
                                        {[...Array(4)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="size-4 text-yellow-400"
                                                fill="#facc15"
                                            />
                                        ))}
                                        <Star className="size-4 text-yellow-400" />
                                    </div>
                                    <span className="text-sm">144 Reviews</span>
                                </div>
                                <Skeleton className="mt-2 h-28 w-full bg-amber-200" />
                                <Separator className="my-6 bg-amber-200" />
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-10 w-28 bg-amber-200" />
                                    <Skeleton className="h-10 w-60 bg-amber-200" />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-2xl text-amber-800">
                                    Brand
                                </h1>
                                <p className="text-4xl text-amber-500">
                                    {product?.name}
                                </p>
                                <div className="flex mt-3">
                                    <RatingExample />
                                    <span className="text-sm ml-2">
                                        144 Reviews
                                    </span>
                                </div>
                                <div className="mt-3">
                                    <p>{product?.description}</p>
                                </div>

                                <form
                                    onSubmit={form.handleSubmit(onsubmit)}
                                    className="mt-4"
                                >
                                    <FieldGroup>
                                        <Controller
                                            name="address"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field
                                                    data-invalid={
                                                        fieldState.invalid
                                                    }
                                                >
                                                    <FieldLabel htmlFor="address-input">
                                                        Address
                                                    </FieldLabel>
                                                    <Textarea
                                                        id="address-input"
                                                        className="border-amber-500 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-0"
                                                        placeholder="e.g Open Street 505"
                                                        {...field}
                                                    />

                                                    {fieldState.invalid && (
                                                        <FieldError
                                                            errors={[
                                                                fieldState.error,
                                                            ]}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="pincode"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field
                                                    data-invalid={
                                                        fieldState.invalid
                                                    }
                                                >
                                                    <FieldLabel htmlFor="pincode-input">
                                                        Pincode
                                                    </FieldLabel>
                                                    <Input
                                                        {...field}
                                                        type="string"
                                                        id="form-rhf-demo-pincode"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        placeholder="Enter The Pincode"
                                                        autoComplete="off"
                                                        className="border-amber-500 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-0"
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError
                                                            errors={[
                                                                fieldState.error,
                                                            ]}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                        <Controller
                                            name="qty"
                                            control={form.control}
                                            render={({ field, fieldState }) => (
                                                <Field
                                                    data-invalid={
                                                        fieldState.invalid
                                                    }
                                                >
                                                    <FieldLabel htmlFor="qty-input">
                                                        Quantity
                                                    </FieldLabel>
                                                    <Input
                                                        {...field}
                                                        type="number"
                                                        id="form-rhf-demo-qty"
                                                        aria-invalid={
                                                            fieldState.invalid
                                                        }
                                                        placeholder="Enter The Quantity"
                                                        autoComplete="off"
                                                        className="border-amber-500 bg-white placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-0"
                                                        onChange={(e) => {
                                                            const val =
                                                                e.target
                                                                    .valueAsNumber;
                                                            field.onChange(
                                                                isNaN(val)
                                                                    ? ""
                                                                    : val,
                                                            );
                                                        }}
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError
                                                            errors={[
                                                                fieldState.error,
                                                            ]}
                                                        />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </FieldGroup>
                                    <Separator className="bg-amber-700 my-3" />

                                    <div className="flex justify-between items-center">
                                        <p className="text-3xl">$ {price}</p>

                                        {session ? (
                                            <Button
                                                className="bg-amber-700 px-4 py-2 hover:bg-amber-500"
                                                disabled={isPending}
                                            >
                                                {isPending
                                                    ? "Processing.."
                                                    : "Submit Order"}
                                            </Button>
                                        ) : (
                                            <Link
                                                href={`/api/auth/signin?callbackUrl=${pathname}`}
                                            >
                                                <Button className="bg-amber-700 px-4 py-2 hover:bg-amber-500">
                                                    Submit Order
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
