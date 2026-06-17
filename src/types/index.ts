import { string } from "zod";

export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}

export interface Warehouse {
    id: string;
    name: string;
    pincode: string;
}

export interface DeliveryPerson {
    id: string;
    name: string;
    phone: string;
    warehouse: string;
}
