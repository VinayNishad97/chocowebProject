import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function SpecialProducts() {
    const products = [
        { src: "/product1.jpg", alt: "product1", name: "Cadbury Dairy Milk" },
        { src: "/product2.jpg", alt: "product2", name: "Mars Bars" },
        { src: "/product3.jpg", alt: "product3", name: "Lindt Excellence Bar" },
        { src: "/product2.jpg", alt: "product2", name: "Mars Bars" },
    ];

    return (
        <section className="mx-auto max-w-6xl px-5 py-14 md:py-20 overflow-hidden">
            <div className="flex items-center justify-center gap-3 sm:gap-5">
                <Separator className="h-0.5 w-10 sm:w-20 bg-brown-900 shrink" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-brown-900 whitespace-nowrap">
                    Special Products
                </h2>
                <Separator className="h-0.5 w-10 sm:w-20 bg-brown-900 shrink" />
            </div>

            <div className="mt-12 md:mt-20 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center gap-3"
                    >
                        <div className="relative aspect-square w-full max-w-[220px] rounded-full border-8 border-solid border-black/10 overflow-hidden">
                            <Image
                                src={product.src}
                                alt={product.alt}
                                fill
                                sizes="(max-w-768px) 220px, 25vw"
                                className="object-cover"
                            />
                        </div>
                        <p className="font-semibold text-center text-brown-900">
                            {product.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
