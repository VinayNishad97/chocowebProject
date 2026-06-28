import { db } from "@/src/lib/db/db";
import { products } from "@/src/lib/db/schema";
import { productSchema } from "@/src/lib/validators/productSchema";
import { desc } from "drizzle-orm";
import { unlink, writeFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
    const data = await request.formData();
    let validatedData;
    try {
        validatedData = productSchema.parse({
            name: data.get("name"),
            description: data.get("description"),
            image: data.get("image"),

            price: Number(data.get("price")),
        });
    } catch (error) {
        return Response.json({ massge: error }, { status: 400 });
    }
    //@ts-ignore
    const filename = `${Date.now()}.${validatedData.image.name.split(".").slice(-1)}`;

    try {
        //@ts-ignore
        const buffer = Buffer.from(await validatedData.image.arrayBuffer());
        await writeFile(
            path.join(process.cwd(), "public/assets", filename),
            buffer,
        );
    } catch (error) {
        return Response.json({ massge: error }, { status: 500 });
    }

    try {
        await db.insert(products).values({ ...validatedData, image: filename });
    } catch (error) {
        await unlink(path.join(process.cwd(), "public/assets", filename));
        return Response.json({ massge: error }, { status: 500 });
    }

    return Response.json({ massge: "ok" }, { status: 201 });
}

export async function GET() {
    let allproducts;
    try {
        allproducts = await db
            .select()
            .from(products)
            .orderBy(desc(products.id));
    } catch (error) {
        return Response.json(
            { message: "There is an error while fetching data from DB" },
            { status: 500 },
        );
    }

    return Response.json(allproducts);
}
