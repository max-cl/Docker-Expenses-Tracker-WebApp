import { Model, DataTypes, Sequelize, Optional } from "sequelize";

// Models
import { User } from "./user.model";

interface BudgetAttributes {
    budget_id?: number;
    amount: number;
    user_id: User["user_id"];
    budget_date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

// Some attributes are optional in `Expense.build` and `Expense.create` calls
interface BudgetCreationAttributes extends Optional<BudgetAttributes, "budget_id"> {}

export class Budget extends Model<BudgetAttributes, BudgetCreationAttributes> implements BudgetAttributes {
    public budget_id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public user_id!: number;
    public amount!: number;
    public budget_date!: Date;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

export default (sequelize: Sequelize): typeof Budget => {
    Budget.init(
        {
            budget_id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
            },
            user_id: {
                allowNull: false,
                references: {
                    key: "user_id",
                    model: "users",
                },
                type: DataTypes.INTEGER.UNSIGNED,
            },
            amount: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            budget_date: {
                type: DataTypes.DATE,
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
            tableName: "budget",
        },
    );

    return Budget;
};
