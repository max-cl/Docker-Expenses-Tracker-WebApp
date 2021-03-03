import { AuthService } from "services/auth.service";
import { ExpenseService } from "services/expense.service";
import { DashboardService } from "services/dashboard.service";
import { AppService } from "services/app.service";
import { BudgetService } from "services/budget.service";

// Models
import { db } from "models";

const authService = new AuthService(db);
const expenseService = new ExpenseService(db);
const dashboardService = new DashboardService(db);
const appService = new AppService(db);
const budgetService = new BudgetService(db);

export { authService, expenseService, dashboardService, appService, budgetService };
