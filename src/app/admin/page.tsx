import { Suspense } from "react";
import Cardd from "@/components/card";
import { ChartAreaInteractive } from "@/components/areachart";

export default function AdminDashboard() {
    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Suspense
                    fallback={
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    }
                >
                    <Cardd cardcontent={4121545} cardfooter={"Total Revenue"} />
                </Suspense>

                <Suspense
                    fallback={
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    }
                >
                    <Cardd cardcontent={4121545} cardfooter={"Total Revenue"} />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    }
                >
                    <Cardd cardcontent={4121545} cardfooter={"Total Revenue"} />
                </Suspense>
            </div>
            <Suspense
                fallback={
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
                }
            >
                <ChartAreaInteractive />
            </Suspense>
        </>
    );
}
