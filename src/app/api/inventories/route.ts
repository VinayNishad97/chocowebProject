import { db } from "@/src/lib/db/db";
import { inventories } from "@/src/lib/db/schema";
import { inventorySchema } from "@/src/lib/validators/inventorySchema";

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
