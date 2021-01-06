export interface IOrderCreate {
    user_id: number;
    products: { order_id: number; quantity: number; product_id: number }[];
}

export interface IOrderProductUpdate {
    odetail_id: number;
    quantity: number;
}
