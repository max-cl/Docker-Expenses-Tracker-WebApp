import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// Models
import { ProductCategory } from "./product_category.model";

interface ProductAttributes {
    product_id?: number;
    product_name: string;
    in_stock: number;
    price: number;
    category_id: ProductCategory["category_id"];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `Product.build` and `Product.create` calls
interface ProductCreationAttributes extends Optional<ProductAttributes, "product_id"> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public product_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public product_name!: string;
    public category_id!: number;
    public in_stock!: number;
    public price!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof Product => {
    Product.init(
        {
            product_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            product_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            in_stock: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            category_id: {
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
            tableName: "products",
        },
    );

    return Product;
};
