import z from "zod";

export const inventorySchema = z.object({
    sku: z
        .string({ message: "SKU should be string" })
        .length(8, "SKU lenght must be 8 chars long"),

    warehouseId: z.number({ message: "werehouse Id should be number  " }),
    productId: z.number({ message: "Product Id should be number " }),
});
