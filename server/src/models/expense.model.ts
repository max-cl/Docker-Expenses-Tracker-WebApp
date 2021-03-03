import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// Models
import { ExpenseCategory } from "./expense_category.model";
import { User } from "./user.model";

interface ExpenseAttributes {
    expense_id?: number;
    expense_name: string;
    amount: number;
    img_link: string;
    category_id: ExpenseCategory["category_id"];
    user_id: User["user_id"];
    expense_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `Expense.build` and `Expense.create` calls
interface ExpenseCreationAttributes extends Optional<ExpenseAttributes, "expense_id"> {}

export class Expense extends Model<ExpenseAttributes, ExpenseCreationAttributes> implements ExpenseAttributes {
    public expense_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public expense_name!: string;
    public category_id!: number;
    public user_id!: number;
    public amount!: number;
    public img_link!: string;
    public expense_date!: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof Expense => {
    Expense.init(
        {
            expense_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            expense_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            img_link: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            expense_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
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
            tableName: "expenses",
        },
    );

    return Expense;
};
