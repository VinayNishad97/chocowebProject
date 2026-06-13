import { db } from "@/src/lib/db/db";
import { deliveryPersons } from "@/src/lib/db/schema";
import { deliveryPersonSchema } from "@/src/lib/validators/deliveryPersonSchema";

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
