import { db } from "@/src/lib/db/db";
import { products } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    console.log("this is id", id);

    try {
        const specificproduct = await db
            .select()
            .from(products)
            .where(eq(products.id, Number(id)))
            .limit(1);
        if (!specificproduct.length) {
            return Response.json(
                { mssg: "Product not found" },
                { status: 500 },
            );
        }
        return Response.json(specificproduct[0], { status: 201 });
    } catch (error) {
        return Response.json({ massge: "server error " }, { status: 500 });
    }
}
