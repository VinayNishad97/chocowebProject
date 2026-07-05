"use client";
import { Suspense } from "react";
import Cardd from "@/components/card";
import { ChartAreaInteractive } from "@/components/areachart";
import { useQuery } from "@tanstack/react-query";
import { GetOrders, GetPaidOrders } from "../http/orders-api";
import { getAllProducts } from "../http/api";

export const dynamic = "force-dynamic";
export default function AdminDashboard() {
    const { data: order } = useQuery({
        queryKey: ["orders"],
        queryFn: GetOrders,
    });
    const { data: products } = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });
    const { data: paidorders } = useQuery({
        queryKey: ["paidorders"],
        queryFn: GetPaidOrders,
    });
    const totalOrders = order?.length;
    let PaidPrice = paidorders?.map((e) => e.price);

    let finalpaidprice = 0;
    if (!PaidPrice?.length) {
        PaidPrice = [];
    }
    if (PaidPrice.length === 1) {
        finalpaidprice = PaidPrice[0];
    }
    if (PaidPrice?.length > 1) {
        for (let i = 0; i < PaidPrice?.length; i++) {
            finalpaidprice += PaidPrice[i];
        }
    }
    let Totalprice = products?.map((e) => e.price);
    if (!Totalprice?.length) {
        Totalprice = [];
    }
    let finalprice = 0;
    if (Totalprice?.length > 1) {
        for (let i = 0; i < Totalprice?.length; i++) {
            finalprice += Totalprice[i];
        }
    }

    return (
        <>
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <Suspense
                    fallback={
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    }
                >
                    <Cardd
                        cardcontent={finalpaidprice}
                        cardfooter={"Total Revenue"}
                    />
                </Suspense>

                <Suspense
                    fallback={
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    }
                >
                    <Cardd
                        cardcontent={totalOrders}
                        cardfooter={"Total Orders"}
                    />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    }
                >
                    <Cardd
                        cardcontent={finalprice}
                        cardfooter={"Total Products Price"}
                    />
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
