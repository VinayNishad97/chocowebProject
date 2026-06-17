import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonTable() {
    return (
        <div className="flex w-full flex-col gap-3 border rounded-md p-4">
            <div className="flex gap-4 w-full border-b pb-3 mb-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex gap-4 w-full" key={index}>
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-10 w-1/4" />
                    <Skeleton className="h-10 w-1/4" />
                </div>
            ))}
        </div>
    );
}
