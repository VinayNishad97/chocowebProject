import { db } from "@/src/lib/db/db";
import { inventories, products, warehouses } from "@/src/lib/db/schema";
import { inventorySchema } from "@/src/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const req = await request.json();
    let velidatedData;

    try {
        velidatedData = await inventorySchema.parse(req);
    } catch (error) {
        return Response.json({ mssg: error }, { status: 400 });
    }

    try {
        await db.insert(inventories).values(velidatedData);
        return Response.json({ mssg: "OK" }, { status: 201 });
    } catch (error) {
        return Response.json({ mssg: error }, { status: 500 });
    }
}

export async function GET() {
    try {
        const allinvontories = await db
            .select({
                id: inventories.id,
                sku: inventories.sku,
                warehouse: warehouses.name,
                product: products.name,
            })
            .from(inventories)
            .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
            .leftJoin(products, eq(inventories.productId, products.id))
            .orderBy(desc(inventories.id));
        return Response.json(allinvontories, { status: 200 });
    } catch (error) {
        return Response.json({ mssg: error }, { status: 500 });
    }
}
