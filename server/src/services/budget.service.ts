import { QueryTypes } from "sequelize";
// Models
import { DB } from "models";

export class BudgetService {
    constructor(private db: DB) {}

    public createNewBudget = async (amount: number, budget_date: Date, user_id: number) => {
        const data = await this.db.Budget.create({ amount, budget_date, user_id });
        return data;
    };
}
