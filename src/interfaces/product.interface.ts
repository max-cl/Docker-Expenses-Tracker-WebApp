export interface ProductCreate {
    product_id?: number;
    product_name: string;
    in_stock: number;
    price: number;
    category_id: number;
}

/** Params interfaces / Type */
// export interface Dictionary<T> {
//     [key: string]: T;
// }

// export type ParamsDictionary = Dictionary<string>;
/********************************/

export interface ProductUpdate {
    product_id: number;
    product_name: string;
    in_stock: number;
    price: number;
    category_id: number;
}
