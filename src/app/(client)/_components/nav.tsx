import Link from "next/link";

const Links = [
    { name: "Home", href: "/" },
    {
        name: "Best Selling",
        href: "/bestselling",
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

export default function Nav() {
    return (
        <>
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
        </>
    );
}
