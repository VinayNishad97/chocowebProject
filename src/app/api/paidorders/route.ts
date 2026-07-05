import { db } from "@/src/lib/db/db";
import { orders } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const data = await db
            .select()
            .from(orders)
            .where(eq(orders.status, "paid"));
        return Response.json(data, { status: 201 });
    } catch (error) {
        return Response.json(error, { status: 500 });
    }
}
