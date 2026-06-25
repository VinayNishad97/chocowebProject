import z from "zod";

export const orderSchema = z.object({
    productsId: z.number({ message: "product Id should be a number" }),
    pincode: z
        .string({ message: "pincode should be string " })
        .length(6, "pincode should be of leangth 6"),

    qty: z.number({ message: "qty should be a number " }),
    address: z
        .string({ message: "address should be a string" })
        .min(5, "address should be min of length 5 char")
        .max(300, "Address must be less than or equal to 300 words"),
});
