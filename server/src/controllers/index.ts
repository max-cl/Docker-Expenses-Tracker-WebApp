import { AuthController } from "controllers/auth.controller";
import { ExpenseController } from "controllers/expense.controller";
import { DashboardController } from "controllers/dashboard.controller";
import { AppController } from "controllers/app.controller";
import { BudgetController } from "controllers/budget.controller";

// Services
import { expenseService, dashboardService, appService, budgetService, authService } from "services";

const authController = new AuthController(authService);
const expenseController = new ExpenseController(expenseService);
const dashboardController = new DashboardController(dashboardService);
const appController = new AppController(appService);
const budgetController = new BudgetController(budgetService);

export { authController, expenseController, dashboardController, appController, budgetController };
