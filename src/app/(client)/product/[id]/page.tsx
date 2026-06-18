"use client";

import { getSpecificProduct } from "@/src/app/http/api";
import { useQuery } from "@tanstack/react-query";
import Nav from "../../_components/nav";
import { useParams } from "next/navigation";
import Offer from "../../_components/offers";
import Image from "next/image";

export default function Page() {
    const params = useParams();
    // Ensure id is a string and handle potential string arrays safely
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    const {
        data: product,
        isLoading,
        error,
    } = useQuery({
        // 1. Add id to cache key so it refetches when route changes
        queryKey: ["specproduct", id],
        // 2. Only fetch if id exists to prevent undefined API calls
        queryFn: () => getSpecificProduct(id!),
        enabled: !!id,
    });

    return (
        <>
            <Offer />
            <Nav />
            <section className="relative bg-[#f5f5f5]">
                <div className="z-50 mx-auto flex h-full max-w-6xl gap-x-10 px-5 py-14 md:py-20">
                    <div>
                        {isLoading && <p>Loading product...</p>}
                        {error && <p>Failed to load product.</p>}

                        {product && (
                            <Image
                                src={`/assets/${product.image}`}
                                alt={product.name || "Product Image"}
                                width={500}
                                height={500}
                                sizes="(max-width: 768px) 100vw, 448px"
                                className="aspect-square w-[28rem] rounded-md object-cover shadow-2xl"
                                priority
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
