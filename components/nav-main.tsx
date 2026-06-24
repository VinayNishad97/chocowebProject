"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import {
    ShoppingCartIcon,
    HomeIcon,
    BoxIcon,
    Contact,
    LineChart,
    WarehouseIcon,
} from "lucide-react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";

export function NavMain() {
    const pathname = usePathname();

    const getLinkClass = (href: string) => {
        const baseClass =
            "flex gap-2 align-middle rounded-[5px] text-1xl w-100 p-2 cursor-pointer transition-colors";

        const isActive =
            href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(href);

        return isActive
            ? `${baseClass} bg-blue-600 text-white hover:bg-gay-200`
            : `${baseClass} bg-gray-50 text-black hover:bg-gray-200`;
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Service</SidebarGroupLabel>
            <SidebarMenu className="flex flex-col gap-1">
                <Link href="/admin" className={getLinkClass("/admin")}>
                    <HomeIcon className="sm:size-6" />
                    DashBoard
                </Link>
                <Link
                    href="/admin/products"
                    className={getLinkClass("/admin/products")}
                >
                    <BoxIcon className="sm:size-6" />
                    Products
                </Link>
                <Link
                    href="/admin/warehouse"
                    className={getLinkClass("/admin/warehouse")}
                >
                    <WarehouseIcon className="sm:size-6" />
                    WareHouses
                </Link>
                <Link
                    href="/admin/delivery-person"
                    className={getLinkClass("/admin/delivery-person")}
                >
                    <Contact className="sm:size-6" />
                    Deliver Persons
                </Link>
                <Link
                    href="/admin/orders"
                    className={getLinkClass("/admin/orders")}
                >
                    <ShoppingCartIcon className="sm:size-6" />
                    Orders
                </Link>
                <Link
                    href="/admin/inventorie"
                    className={getLinkClass("/admin/inventorie")}
                >
                    <LineChart className="sm:size-6" />
                    Inventories
                </Link>
            </SidebarMenu>
        </SidebarGroup>
    );
}
