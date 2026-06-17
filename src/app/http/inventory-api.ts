import { FormValue } from "../admin/inventorie/_component/create-inventorie-form";
import { api } from "./client";

export const createInventory = async (data: FormValue) => {
    const response = await api.post("/inventories", data, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
