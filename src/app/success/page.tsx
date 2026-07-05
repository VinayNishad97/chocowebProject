import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Success() {
    return (
        <>
            <div className="flex flex-col  gap-10 items-center ">
                <div className="flex flex-col gap-2 items-center">
                    <h1 className="text-6xl text-amber-700">Thank You!!</h1>
                    <h1 className="text-4xl text-amber-400">
                        For Your Shopping
                    </h1>
                </div>
                <Link href={"/"}>
                    <Button className="bg-amber-700 hover:bg-amber-400">
                        Go Back
                    </Button>
                </Link>
            </div>
        </>
    );
}
