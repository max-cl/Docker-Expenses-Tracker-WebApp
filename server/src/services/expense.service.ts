import { QueryTypes } from "sequelize";
// Models
import { DB } from "models";

export class ExpenseService {
    constructor(private db: DB) {}

    public getAllExpenses = async (user_id: number) => {
        // const data = await this.db.Expense.findAll();
        const data = await this.db.sequelize.query(
            "SELECT a.expense_id, a.expense_name, a.amount, a.img_link, a.expense_date, b.category_id, b.category_name FROM expenses a " +
                "INNER JOIN expense_categories b ON a.category_id = b.category_id WHERE a.user_id = " +
                user_id +
                " ORDER BY a.expense_id ASC",
            { type: QueryTypes.SELECT },
        );
        return data;
    };

    public createNewExpense = async (expense_name: string, amount: number, category_id: number, img_link: string, expense_date: Date, user_id: number) => {
        const data = await this.db.Expense.create({ expense_name, amount, category_id, img_link, expense_date, user_id });
        return data;
    };

    public getExpenseById = async (expense_id: number) => {
        const data = await this.db.Expense.findAll({
            where: {
                expense_id,
            },
        });
        return data;
    };

    public updateInfoExpense = async (expense_id: number, category_id: number, expense_name: string, amount: number, img_link: string, expense_date: Date) => {
        const expenseUpdated = await this.db.Expense.update(
            { category_id, expense_name, amount, img_link, expense_date },
            {
                where: {
                    expense_id,
                },
            },
        );
        return expenseUpdated;
    };

    public removeExpense = async (expense_id: number) => {
        const expenseDeleted = await this.db.Expense.destroy({
            where: {
                expense_id,
            },
        });
        return expenseDeleted;
    };
}
