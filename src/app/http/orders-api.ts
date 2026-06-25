import { FormValue } from "../(client)/product/[id]/page";
import { api } from "./client";

export const CreateOrder = async (data: FormValue) => {
    const response = await api.post("/orders", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return response.data;
};
