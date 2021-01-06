// Models
import { DB } from "models";

export class ProductService {
    constructor(private db: DB) {}

    public getAllProducts = async () => {
        const data = await this.db.Product.findAll();
        return data;
    };

    public createNewProduct = async (product_name: string, in_stock: number, price: number, category_id: number) => {
        const data = await this.db.Product.create({ product_name, in_stock, price, category_id });
        return data;
    };

    public getProductById = async (product_id: number) => {
        const data = await this.db.Product.findAll({
            where: {
                product_id,
            },
        });
        return data;
    };

    public updateInfoProduct = async (product_id: number, category_id: number, product_name: string, in_stock: number, price: number) => {
        const productUpdated = await this.db.Product.update(
            { category_id, product_name, in_stock, price },
            {
                where: {
                    product_id,
                },
            },
        );
        return productUpdated;
    };

    public removeProduct = async (product_id: number) => {
        const productDeleted = await this.db.Product.destroy({
            where: {
                product_id,
            },
        });
        return productDeleted;
    };
}
