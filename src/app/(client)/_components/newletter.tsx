import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";

export default function NewsLetter() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center rounded-3xl px-6 py-14 text-center text-white sm:px-10">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                    Stay Updated with Newsletter
                </h2>

                <p className="mt-4 w-full text-sm opacity-90 sm:text-base md:w-8/12">
                    Get the latest news, exclusive offers, and delicious updates
                    delivered right to your inbox with our chocolate and cake
                    shop newsletter.
                </p>

                <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:relative sm:flex-row sm:gap-0">
                    <Input
                        className="w-full border-white/40 bg-white/10 placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 focus-visible:ring-offset-0 sm:pr-24"
                        placeholder="Enter your email address"
                    />
                    <Button
                        variant="secondary"
                        className="h-10 text-amber-700 bg-white  hover:bg-white/90 sm:absolute sm:right-1 sm:top-1/2 sm:h-8 sm:-translate-y-1/2 sm:transform"
                        size="sm"
                    >
                        Subscribe
                    </Button>
                </div>

                <Image
                    src="/choco-bg.jpg"
                    alt="Hero Chocolate"
                    fill
                    className="-z-10 rounded-3xl object-cover"
                    priority
                />
                <div className="absolute inset-0 -z-10 rounded-3xl bg-black/70" />
            </div>
        </section>
    );
}
