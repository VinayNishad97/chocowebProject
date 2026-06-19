import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            <img
                src="/herochoco.jpg"
                alt="Hero Choco image"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 md:inset-y-0 md:left-0 w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 md:px-16 bg-black/50 md:bg-gradient-to-r md:from-black/60 md:to-transparent text-white space-y-4 md:space-y-6 z-10">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                    10 Minute Delivery <br className="hidden sm:inline" /> At
                    Your Door
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed max-w-xl">
                    Why Wait? Our 10-Minute Delivery Service brings your
                    favorite chocolate to your door, swiftly and reliably.
                    Convenience and indulgence all in one package.
                </p>

                <Button className="w-fit px-8 py-6 text-base bg-white text-black hover:bg-amber-700 transition-colors">
                    Shop Now
                </Button>
            </div>
        </section>
    );
}
