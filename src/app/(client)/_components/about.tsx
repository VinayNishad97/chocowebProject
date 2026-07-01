import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function About() {
    return (
        <section className="max-w-6xl mx-auto px-5 md:py-20 py-14">
            <div className="px-10 py-14 rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent max-w-4xl mx-auto flex justify-center items-center flex-col">
                <div className="flex justify-center items-center gap-5">
                    <Separator className="w-20 bg-brown-900 h-0.5" />
                    <h2 className="text-brown-900 text-3xl font-bold tracking-tight">
                        About
                    </h2>
                    <Separator className="w-20 bg-brown-900 h-0.5" />
                </div>
                <p className="text-center mt-10 w-10/12">
                    HII, I am Vinay Nishad an I.T student in BMU(Bhagwan mahavir
                    university). I am a full stack developer. This website is
                    made up on Nextjs, Reactjs, TanStack(TanStack Query for
                    fetching), Drizzle(for migrations),NextAuth(for
                    Authentication), Supabase(for posgreSQL),ShadCN UI (for
                    Complex UI)
                </p>
                <div className="flex items-center gap-1">
                    <label>Contect : </label>
                    <h1 className="text-amber-600 text-1xl hover:text-amber-400 hover:cursor-pointer">
                        vinay972591@gmail.com
                    </h1>
                </div>
            </div>
        </section>
    );
}
