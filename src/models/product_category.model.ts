import { Model, Sequelize, DataTypes, Optional } from "sequelize";

interface ProductCategoryAttributes {
    category_id?: number;
    category_name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `ProductCategory.build` and `ProductCategory.create` calls
interface ProductCategoryCreationAttributes extends Optional<ProductCategoryAttributes, "category_id"> {}

export class ProductCategory extends Model<ProductCategoryAttributes, ProductCategoryCreationAttributes> implements ProductCategoryAttributes {
    public category_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public category_name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof ProductCategory => {
    ProductCategory.init(
        {
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            category_name: {
                type: DataTypes.STRING,
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
            tableName: "product_categories",
        },
    );

    return ProductCategory;
};
