import 'dotenv/config';
import { Sequelize } from 'sequelize';
import UserFactory, { User } from 'models/user.model';
import RoleFactory, { Role } from 'models/role.model';
import ExpenseFactory, { Expense } from 'models/expense.model';
import ExpenseCategoryFactory, { ExpenseCategory } from 'models/expense_category.model';
import BudgetFactory, { Budget } from 'models/budget.model';

// ENV Variables
const DB_URL = process.env.DB_URL;

export interface DB {
    sequelize: Sequelize;
    User: typeof User;
    Role: typeof Role;
    Expense: typeof Expense;
    ExpenseCategory: typeof ExpenseCategory;
    Budget: typeof Budget;
}

const sequelize = new Sequelize(`${DB_URL}`);

// SOMETHING VERY IMPORTANT them Factory functions expect a
// sequelize instance as parameter
export const UserModel = UserFactory(sequelize);
export const RoleModel = RoleFactory(sequelize);
export const ExpenseModel = ExpenseFactory(sequelize);
export const ExpenseCategoryModel = ExpenseCategoryFactory(sequelize);
export const BudgetModel = BudgetFactory(sequelize);

/** MANAGE USER AND ROLES */
UserModel.belongsToMany(RoleModel, {
    through: 'user_roles',
    foreignKey: 'user_id',
    otherKey: 'role_id',
});
RoleModel.belongsToMany(UserModel, {
    through: 'user_roles',
    foreignKey: 'role_id',
    otherKey: 'user_id',
});

/** Expenses */
ExpenseModel.belongsTo(UserModel, { foreignKey: 'user_id' });
ExpenseCategoryModel.hasOne(ExpenseModel, { foreignKey: 'category_id' });

/** Budget */
BudgetModel.belongsTo(UserModel, { foreignKey: 'user_id' });

export const db: DB = {
    sequelize,
    User: UserModel,
    Role: RoleModel,
    Expense: ExpenseModel,
    ExpenseCategory: ExpenseCategoryModel,
    Budget: BudgetModel,
};
