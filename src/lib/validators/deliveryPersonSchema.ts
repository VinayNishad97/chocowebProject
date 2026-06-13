import z from "zod";

export const deliveryPersonSchema = z.object({
    name: z.string({ message: "name should be string" }),
    phone: z
        .string({ message: "phone number should be string " })
        .length(13, "phone number should be 13 characters long"),
    warehouseId: z.number({ message: "Ware house Id should be a number " }),
});
