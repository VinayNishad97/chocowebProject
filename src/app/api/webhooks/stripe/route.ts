import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/src/lib/db/db";
import { orders } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-06-24.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 },
        );
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const orderId = session.metadata?.orderId;

        if (orderId) {
            console.log(`Payment confirmed for Order ID: ${orderId}`);

            await db
                .update(orders)
                .set({ status: "paid" })
                .where(eq(orders.id, Number(orderId)));
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
