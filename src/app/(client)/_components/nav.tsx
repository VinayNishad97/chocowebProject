import Link from "next/link";

const Links = [
    { name: "Home", href: "/" },
    {
        name: "Products",
        href: "/products",
    },
    {
        name: "Offers",
        href: "/offers",
    },
    {
        name: "Orders",
        href: "/orders",
    },
];

const AutherizedOnlyLinks = [
    {
        name: "Admin",
        href: "/admin",
    },
];

export default function Nav() {
    return (
        <>
            <div className="flex items-center justify-around">
                <div className="flex gap-5 justify-center p-2">
                    {Links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className="hover:text-amber-900  hover:underline hover:underline-offset-8 text-amber-600"
                        >
                            {l.name}
                        </Link>
                    ))}
                </div>

                <div>
                    {AutherizedOnlyLinks.map((a) => (
                        <Link
                            key={a.href}
                            href={a.href}
                            className="hover:text-amber-900  hover:underline hover:underline-offset-8 text-amber-600"
                        >
                            {a.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
