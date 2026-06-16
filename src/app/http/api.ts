import { Product } from "@/src/types";
import { api } from "./client";

export const getAllProducts = async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
};
