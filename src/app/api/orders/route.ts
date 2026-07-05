import { authOptions } from "@/src/lib/auth/authOptions";
import { db } from "@/src/lib/db/db";
import {
    deliveryPersons,
    inventories,
    orders,
    products,
    warehouses,
} from "@/src/lib/db/schema";
import { orderSchema } from "@/src/lib/validators/orderSchema";
import { and, desc, eq, inArray, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { exportTraceState } from "next/dist/trace";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-06-24.dahlia",
});

export async function POST(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ message: "Not authenticated" }, { status: 501 });
    }

    const data = await request.json();
    let validatedData;
    try {
        validatedData = await orderSchema.parse(data);
    } catch (error) {
        return Response.json(
            { message: "Validation error", error },
            { status: 400 },
        );
    }

    // Get warehouse
    const warehouseResult = await db
        .select({ id: warehouses.id })
        .from(warehouses)
        .where(eq(warehouses.pincode, validatedData.pincode));

    if (!warehouseResult.length) {
        return Response.json(
            { message: "No warehouse found" },
            { status: 404 },
        );
    }

    // Get product
    const foundProducts = await db
        .select()
        .from(products)
        .where(eq(products.id, validatedData.productsId))
        .limit(1);

    if (!foundProducts.length) {
        return Response.json({ message: "No product found" }, { status: 404 });
    }

    const product = foundProducts[0];
    const totalPrice = product.price * validatedData.qty;

    let transactionError = "";
    let finalOrder: any = null;

    try {
        finalOrder = await db.transaction(async (tx) => {
            console.log("starting transaction");

            const order = await tx
                .insert(orders)
                .values({
                    ...validatedData,
                    userId: Number(session.user.id),
                    price: totalPrice,
                    status: "pending",
                })
                .returning({ id: orders.id, price: orders.price });

            console.log("orders", order);

            // Check available stock
            const availableStock = await tx
                .select()
                .from(inventories)
                .where(
                    and(
                        eq(inventories.warehouseId, warehouseResult[0].id),
                        eq(inventories.productId, validatedData.productsId),
                        isNull(inventories.orderId),
                    ),
                )
                .limit(validatedData.qty)
                .for("update", { skipLocked: true });

            if (availableStock.length < validatedData.qty) {
                transactionError = `Low on Stock, Only ${availableStock.length} Pieces left`;
                tx.rollback();
                return;
            }

            // Find available delivery person
            const availablePerson = await tx
                .select()
                .from(deliveryPersons)
                .where(
                    and(
                        isNull(deliveryPersons.orderId),
                        eq(deliveryPersons.warehouseId, warehouseResult[0].id),
                    ),
                )
                .for("update")
                .limit(1);

            if (!availablePerson.length) {
                transactionError =
                    "Delivery person is not available at the moment";
                tx.rollback();
                return;
            }

            // Reserve inventory
            await tx
                .update(inventories)
                .set({ orderId: order[0].id })
                .where(
                    inArray(
                        inventories.id,
                        availableStock.map((stock) => stock.id),
                    ),
                );

            await tx
                .update(deliveryPersons)
                .set({ orderId: order[0].id })
                .where(eq(deliveryPersons.id, availablePerson[0].id));

            await tx
                .update(orders)
                .set({ status: "reserved" })
                .where(eq(orders.id, order[0].id));

            return order[0];
        });
    } catch (error) {
        if (transactionError) {
            return Response.json(
                { message: transactionError },
                { status: 400 },
            );
        }

        console.error("Database transaction system failure:", error);
        return Response.json(
            { message: "Database transaction failed" },
            { status: 500 },
        );
    }

    if (!finalOrder || !finalOrder.id) {
        return Response.json(
            { message: transactionError || "Order processing failed safely" },
            { status: 400 },
        );
    }

    try {
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price * 100,
                    },
                    quantity: validatedData.qty,
                },
            ],
            mode: "payment",
            success_url: `${process.env.CLIENT_DOMAIN}/success`,
            cancel_url: `${process.env.CLIENT_DOMAIN}/${finalOrder.id}`,
            metadata: {
                orderId: finalOrder.id.toString(),
                userId: session.user.id,
            },
        });

        return Response.json({ url: stripeSession.url }, { status: 200 });
    } catch (stripeError) {
        console.error("Stripe Session Failure:", stripeError);
        return Response.json(
            {
                message: "Order reserved, but Stripe session creation failed",
                error: String(stripeError),
            },
            { status: 500 },
        );
    }
}

export async function GET() {
    try {
        const data = await db.select().from(orders).orderBy(desc(orders.id));

        return Response.json(data, { status: 201 });
    } catch (error) {
        return Response.json(error, { status: 500 });
    }
}
