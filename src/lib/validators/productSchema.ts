import z from "zod";

export const productSchema = z.object({
    name: z.string({ message: "name should be string" }),
    image: z.instanceof(File, {
        message: "image should be file of image or image file ",
    }),
    description: z.string({ message: "description should be string " }),
    price: z.number({ message: "price should be of type number " }),
});
