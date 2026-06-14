"use client";
import Image from "next/image";
import {
    SidebarMenu,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function TeamSwitcher() {
    const { isMobile } = useSidebar();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex gap-2 ">
                    <Image
                        src={"/choco.png"}
                        width={50}
                        height={20}
                        alt="chocolatee"
                    />
                    <h1 className="text-center text-4xl">Choco</h1>
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
