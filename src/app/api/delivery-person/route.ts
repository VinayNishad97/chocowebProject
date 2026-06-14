import { db } from "@/src/lib/db/db";
import { deliveryPersons, warehouses } from "@/src/lib/db/schema";
import { deliveryPersonSchema } from "@/src/lib/validators/deliveryPersonSchema";
import { desc, eq } from "drizzle-orm";

export async function POST(reqest: Request) {
    const reqData = await reqest.json();
    let validatedData;
    try {
        validatedData = await deliveryPersonSchema.parse(reqData);
    } catch (error) {
        return Response.json({ mssg: error }, { status: 400 });
    }

    try {
        await db.insert(deliveryPersons).values(validatedData);
        return Response.json({ mssg: "OK" }, { status: 201 });
    } catch (err) {
        return Response.json({ mssg: err }, { status: 500 });
    }
}

export async function GET() {
    try {
        const data = await db
            .select({
                id: deliveryPersons.id,
                name: deliveryPersons.name,
                phone: deliveryPersons.phone,
                warehouse: warehouses.name,
            })
            .from(deliveryPersons)
            .leftJoin(
                warehouses,
                eq(deliveryPersons.warehouseId, warehouses.id),
            )
            .orderBy(desc(deliveryPersons.id));

        return Response.json(data, { status: 200 });
    } catch (error) {
        return Response.json(
            { mssg: "failed to fetch delivery person" },
            { status: 500 },
        );
    }
}
