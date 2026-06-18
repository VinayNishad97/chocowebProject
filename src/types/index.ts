export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
}
export interface FullProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    description: string;
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

export interface Inventories {
    sku: string;
    warehouseId: number;
    productid: number;
}
