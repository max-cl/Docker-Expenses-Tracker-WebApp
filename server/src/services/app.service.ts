// Models
import { DB } from "models";

export class AppService {
    constructor(private db: DB) {}

    public getExpenseCategories = async () => {
        const data = await this.db.ExpenseCategory.findAll();
        return data;
    };
}
