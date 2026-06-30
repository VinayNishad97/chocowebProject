"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { CollapsibleBasic } from "@/components/userProfile";
import { Links, AutherizedOnlyLinks } from "@/src/constents";

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <div className="flex items-center justify-between md:justify-around p-4 md:p-2 bg-white relative z-50">
                <div className="hidden md:flex gap-5 justify-center">
                    {Links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="hover:text-amber-900 hover:underline hover:underline-offset-8 text-amber-600"
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex gap-5 items-center">
                    {AutherizedOnlyLinks.map((a) => (
                        <Link
                            key={a.href}
                            href={a.href}
                            className="hover:text-amber-900 hover:underline hover:underline-offset-8 text-amber-600"
                        >
                            {a.name}
                        </Link>
                    ))}
                    <CollapsibleBasic />
                </div>

                <div className="flex md:hidden w-full justify-between items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-amber-600 focus:outline-none"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={28} />}
                    </button>
                    <CollapsibleBasic />
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={toggleMenu}
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-end p-4">
                    <button onClick={toggleMenu} className="text-amber-600">
                        <X size={28} />
                    </button>
                </div>

                <nav className="flex flex-col gap-6 p-6">
                    {Links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={toggleMenu}
                            className="text-xl font-medium text-amber-600 hover:text-amber-900"
                        >
                            {l.name}
                        </Link>
                    ))}
                    <div className="h-px bg-amber-100 my-2" />
                    {AutherizedOnlyLinks.map((a) => (
                        <Link
                            key={a.href}
                            href={a.href}
                            onClick={toggleMenu}
                            className="text-xl font-medium text-amber-600 hover:text-amber-900"
                        >
                            {a.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
