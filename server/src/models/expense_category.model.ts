import { Model, Sequelize, DataTypes, Optional } from "sequelize";

interface ExpenseCategoryAttributes {
    category_id?: number;
    category_name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `ExpenseCategory.build` and `ExpenseCategory.create` calls
interface ExpenseCategoryCreationAttributes extends Optional<ExpenseCategoryAttributes, "category_id"> {}

export class ExpenseCategory extends Model<ExpenseCategoryAttributes, ExpenseCategoryCreationAttributes> implements ExpenseCategoryAttributes {
    public category_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public category_name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof ExpenseCategory => {
    ExpenseCategory.init(
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
            tableName: "expense_categories",
        },
    );

    return ExpenseCategory;
};
