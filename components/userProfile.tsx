"use client";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function CollapsibleBasic() {
    const session = useSession();
    const pathname = usePathname();
    const name = session.data?.user.name;
    const email = session.data?.user.email;
    const userRole = session.data?.user.role;
    const userimg = session.data?.user.image?.toString();
    return (
        <>
            {!email ? (
                <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                    <Button className="bg-amber-600 hover:bg-amber-400">
                        Login
                    </Button>
                </Link>
            ) : (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <img
                                src={userimg}
                                alt="."
                                className="rounded-full h-5 w-5"
                            />
                            {name}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem variant="default">
                            <p>@</p>
                            {email}
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="default">
                            <UserIcon />
                            {userRole}
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            variant="destructive"
                            className="bg-red-100"
                        >
                            <LogOutIcon />
                            <Button
                                className="bg-red-100 text-black hover:bg-red-100"
                                onClick={() => signOut()}
                            >
                                Log out
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    );
}
