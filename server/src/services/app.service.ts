// Models
import { DB } from 'models';

export class AppService {
    constructor(private db: DB) {}

    public getExpenseCategories = async () => await this.db.ExpenseCategory.findAll();
}
