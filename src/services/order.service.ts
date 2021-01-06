// Models
import { DB } from "models";

export class OrderService {
    constructor(private db: DB) {}

    public getAllOrders = async () => {
        const data = await this.db.Order.findAll();
        return data;
    };

    public createNewOrder = async (user_id: number, products: { order_id: number; quantity: number; product_id: number }[]) => {
        const order = await this.db.Order.create({ user_id });
        let productsOrdered = products;
        productsOrdered.forEach((p) => (p.order_id = order.order_id));
        const orderDetail = await this.db.OrderDetail.bulkCreate(productsOrdered);
        return orderDetail;
    };

    public getOrderById = async (order_id: number, user_id: number) => {
        const order = await this.db.Order.findAll({
            where: {
                order_id,
                user_id,
            },
        });

        const orderDetail = await this.db.OrderDetail.findAll({
            where: {
                order_id,
            },
        });

        let result: {}[] = [{ order: order[0] }, { orderDetail: orderDetail }];
        return result;
    };

    public updateProductFromOrder = async (odetail_id: number, quantity: number) => {
        const productUpdated = await this.db.OrderDetail.update(
            { quantity },
            {
                where: {
                    odetail_id,
                },
            },
        );
        return productUpdated;
    };

    public removeProductFromOrder = async (odetail_id: number) => {
        const productDeleted = await this.db.OrderDetail.destroy({
            where: {
                odetail_id,
            },
        });
        return productDeleted;
    };

    public removeOrder = async (order_id: number) => {
        const orderDeleted = await this.db.Order.destroy({
            where: {
                order_id,
            },
        });
        return orderDeleted;
    };
}
