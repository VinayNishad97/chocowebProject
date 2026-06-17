"use client";
import Link from "next/link";
import {
    ShoppingCartIcon,
    HomeIcon,
    BoxIcon,
    Contact,
    LineChart,
    WarehouseIcon,
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
                    href={"/admin/products"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100  p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <BoxIcon className=" sm:size-6" />
                    Products
                </Link>
                <Link
                    href={"/admin/warehouse"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <WarehouseIcon />
                    WareHouses
                </Link>
                <Link
                    href={"/admin/delivery-person"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <Contact className=" sm:size-6" />
                    Deliver Persons
                </Link>
                <Link
                    href={"/admin/orders"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer "
                >
                    <ShoppingCartIcon className=" sm:size-6" />
                    Orders
                </Link>

                <Link
                    href={"/admin/inventorie"}
                    className="flex gap-2 align-middle rounded-[5px] text-1xl bg-gray-50 text-black  w-100 p-2 hover:bg-gray-200 cursor-pointer"
                >
                    <LineChart className=" sm:size-6" />
                    Inventories
                </Link>
            </SidebarMenu>
        </SidebarGroup>
    );
}
