import { FormValue } from "../(client)/product/[id]/page";
import { api } from "./client";
import { Order } from "@/src/types";
export const CreateOrder = async (data: FormValue) => {
    const response = await api.post("/orders", data);

    return response.data;
};

export const GetOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/orders");

    return response.data;
};

export const GetPaidOrders = async (): Promise<Order[]> => {
    const response = await api.get<Order[]>("/paidorders");

    return response.data;
};
