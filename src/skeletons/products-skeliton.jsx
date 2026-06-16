import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable() {
    return (
        <div className="flex w-full max-w-sm flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex gap-4 w-full" key={index}>
                    <Skeleton className="h-10 flex-1 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
            ))}
        </div>
    );
}
