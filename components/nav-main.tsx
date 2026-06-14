"use client";
import Link from "next/link";
import {
    ShoppingCartIcon,
    HomeIcon,
    BoxIcon,
    Contact,
    LineChart,
} from "lucide-react";
import { Button } from "./ui/button";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
} from "@/components/ui/sidebar";

export function NavMain() {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Service</SidebarGroupLabel>
            <SidebarMenu>
                <Link
                    href={"/admin"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <HomeIcon className=" sm:size-6" />
                    DashBoard
                </Link>

                <Link
                    href={"/admin/orders"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <ShoppingCartIcon className=" sm:size-6" />
                    Orders
                </Link>
                <Link
                    href={"/admin/products"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100  p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <BoxIcon className=" sm:size-6" />
                    Products
                </Link>
                <Link
                    href={"/admin/customers"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <Contact className=" sm:size-6" />
                    Customers
                </Link>
                <Link
                    href={"/admin/analytics"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer"
                >
                    <LineChart className=" sm:size-6" />
                    Analytics
                </Link>
            </SidebarMenu>
        </SidebarGroup>
    );
}
