import { api } from "./client";
import { FormValue } from "../admin/delivery-person/_components/create-warehouse-form";
import { DeliveryPerson } from "@/src/types";
export const createDeliveryPerson = async (data: FormValue) => {
    const response = await api.post("/delivery-person", data, {
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
