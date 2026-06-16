import { Product } from "@/src/types";
import { api } from "./client";

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return await response.data;
};

export const createproduct = async (data: FormData) => {
    const response = await api.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};
