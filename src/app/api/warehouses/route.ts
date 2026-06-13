import { db } from "@/src/lib/db/db";
import { warehouses } from "@/src/lib/db/schema";
import { warehouseSchema } from "@/src/lib/validators/warehouseSchema";

export async function POST(request: Request) {
    const data = await request.json();
    let validatedData;
    try {
        validatedData = await warehouseSchema.parse(data);
    } catch (error) {
        return Response.json({ mssg: error }, { status: 400 });
    }

    try {
        await db.insert(warehouses).values(validatedData);
        return Response.json({ mssg: "OK" }, { status: 201 });
    } catch (error) {
        return Response.json(
            {
                messg: "failed to insert warehouse in the database",
            },
            { status: 500 },
        );
    }
}
