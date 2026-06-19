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
import { and, eq, inArray, isNull } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    const session = getServerSession(authOptions);

    if (!session) {
        return Response.json({ massge: "Not authenticated" }, { status: 500 });
    }
    const data = await request.json();
    let velidatedData;

    try {
        velidatedData = await orderSchema.parse(data);
    } catch (error) {
        return Response.json({ mssg: error }, { status: 400 });
    }
    // get warehouse

    const warehouseResult = await db
        .select({ id: warehouses.id })
        .from(warehouses)
        .where(eq(warehouses.pincode, velidatedData.pincode));

    if (!warehouseResult.length) {
        return Response.json({ massge: "no werehouse found" }, { status: 401 });
    }
    // get product

    const foundProducts = await db
        .select()
        .from(products)
        .where(eq(products.id, velidatedData.productId))
        .limit(1);

    if (!foundProducts.length) {
        return Response.json({ massge: "no product found" }, { status: 401 });
    }

    let transactionError: string = "";
    let finalorder;
    try {
        finalorder = await db.transaction(async (tx) => {
            const order = await tx
                .insert(orders)
                // @ts-ignore
                .values({
                    ...velidatedData,
                    // @ts-ignore
                    userId: session.token.id,
                    price: foundProducts[0].price * velidatedData.qty,
                    status: "received",
                })
                .returning({ id: orders.id, price: orders.price });
            // check available stock
            const availableStock = await tx
                .select()
                .from(inventories)
                .where(
                    and(
                        eq(inventories.warehouseId, warehouseResult[0].id),
                        eq(inventories.productId, velidatedData.productId),
                        isNull(inventories.orderId),
                    ),
                )
                .limit(velidatedData.qty)
                .for("update", { skipLocked: true });

            if (availableStock.length < velidatedData.qty) {
                transactionError = `Low on Stock , Only ${availableStock.length} Pieces left`;
                tx.rollback();
                return;
            }

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
                transactionError = `Delivery person is not available at the movment`;
                tx.rollback();
                return;
            }

            await tx
                .update(inventories)
                .set({ orderId: order[0].id })
                .where(
                    inArray(
                        inventories.id,
                        availableStock.map((stock) => stock.id),
                    ),
                );

            // update delivery person
            await tx
                .update(deliveryPersons)
                .set({ orderId: order[0].id })
                .where(eq(deliveryPersons.id, availablePerson[0].id));

            // update orders

            await tx
                .update(orders)
                .set({ status: "reserved" })
                .where(eq(orders.id, order[0].id));

            // transection commit
            return order[0];
        });
    } catch (error) {
        return Response.json(
            {
                massage: transactionError
                    ? transactionError
                    : "error while db transaction",
            },
            { status: 500 },
        );
    }
}
