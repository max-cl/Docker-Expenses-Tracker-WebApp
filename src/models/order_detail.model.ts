import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// Models
import { Order } from "models/order.model";
import { Product } from "models/product.model";

interface OrderDetailAttributes {
    odetail_id?: number;
    order_id: Order["order_id"];
    product_id: Product["product_id"];
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `Order.build` and `Order.create` calls
interface OrderDetailCreationAttributes extends Optional<OrderDetailAttributes, "odetail_id"> {}

export class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
    public odetail_id!: number;
    public order_id!: number;
    public product_id!: number;
    public quantity!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof OrderDetail => {
    OrderDetail.init(
        {
            odetail_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            order_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                unique: false,
            },
            product_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                unique: false,
            },
            quantity: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            sequelize,
            tableName: "order_details",
        },
    );

    return OrderDetail;
};
