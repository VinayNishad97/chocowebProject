import { DeliveryPerson, Inventories, Product } from "@/src/types";
import { api } from "./client";
import { Warehouse } from "@/src/types";
import { FormValue } from "../admin/warehouse/_components/create-warehouse-form";

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

export const getAllwarehouses = async (): Promise<Warehouse[]> => {
    const response = await api.get<Warehouse[]>("/warehouses");
    return await response.data;
};
export const createWarehouse = async (data: FormData) => {
    const response = await api.post("/warehouses", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
export const getAlldeliveryPerson = async (): Promise<DeliveryPerson[]> => {
    const response = await api.get<DeliveryPerson[]>("/delivery-person");
    return response.data;
};

export const createDeliveryPerson = async (data: FormValue) => {
    const response = await api.post("/delivery-person", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

export const getAllInventories = async (): Promise<Inventories[]> => {
    const response = await api.get<Inventories[]>("/inventories");
    return response.data;
};

export const getSpecificProduct = async (id: any): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
};
