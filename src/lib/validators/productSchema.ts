import z from "zod";
const isServer = typeof window === "undefined";
export const productSchema = z.object({
    name: z.string({ message: "name should be string" }).min(4).max(50),
    image: z.instanceof(isServer ? File : FileList, {
        message: "image should be file of image or image file ",
    }),
    description: z
        .string({ message: "description should be string " })
        .min(10)
        .max(300),
    price: z.number({ message: "price should be of type number " }),
});
