"use client";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "../../http/api";
import Offer from "../_components/offers";
import Nav from "../_components/nav";
export default function Products() {
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
        staleTime: 10 * 1000,
    });
    return (
        <>
            <Offer />
            <Nav />
            <section className="bg-[#f5f5f5] px-5 py-14 md:py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="flex items-center justify-center gap-5">
                        <div className="h-0.5 w-5 bg-amber-700 shrink-0" />

                        <h1 className="text-3xl font-bold tracking-tight text-amber-700">
                            Products
                        </h1>

                        <div className="h-0.5 w-5 bg-amber-700 shrink-0" />
                    </div>
                    <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {products?.map((p) => (
                            <div
                                key={p.id}
                                className="flex flex-col items-start justify-center gap-5"
                            >
                                <Image
                                    src={`/assets/${p.image}`}
                                    alt={p.name}
                                    width={0}
                                    height={0}
                                    sizes="100vh"
                                    style={{ width: "100%" }}
                                    className="aspect-square rounded-t-md object-cover shadow-lg hover:cursor-pointer"
                                />
                                <div className="w-full">
                                    <p className="text-lg font-semibold text-amber-700">
                                        {p.name}
                                    </p>
                                    <div className="mt-1 space-x-2">
                                        <span className="font-bold">
                                            ${p.price}
                                        </span>
                                    </div>
                                    <Link href={`/product/${p.id}`}>
                                        <Button className="bg-amber-800 mt-5 w-full hover:bg-amber-500 cursor-pointer">
                                            Buy Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
