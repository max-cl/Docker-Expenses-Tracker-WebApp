import { QueryTypes } from "sequelize";
// Models
import { DB } from "models";

// Interface
import {
    IHighestCategoryData,
    ILowestCategoryData,
    ITotalTodayData,
    IMostSpendingData,
    ITopFiveCategoriesYearlyData,
    IWeeksOfTheYearData,
    ICurrentWeekData,
    ITotalMonthsYearlyData,
    ITopFiveCategoriesYearlyDataReturn,
    IWeeksOfTheYearDataReturn,
    ICurrentWeekDataReturn,
    ITotalMonthsYearlyDataReturn,
} from "interfaces/dashboard.interface";

export class DashboardService {
    constructor(private db: DB) {}

    public getHighestCategory = async (user_id: number): Promise<IHighestCategoryData[]> => {
        const data: IHighestCategoryData[] = await this.db.sequelize.query(
            "SELECT SUM(a.amount) AS amount, b.category_id, b.category_name AS title, CONCAT('Highest Category in ', YEAR(now())) AS description, '/images/category.svg' AS imgpath FROM expenses a " +
                "INNER JOIN expense_categories b ON a.category_id = b.category_id WHERE " +
                "a.user_id = " +
                user_id +
                " AND YEAR(now()) = YEAR(a.expense_date) GROUP BY b.category_id ORDER BY amount DESC LIMIT 1;",
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return [];
        }

        return data;
    };

    public getLowestCategory = async (user_id: number): Promise<ILowestCategoryData[]> => {
        const data: ILowestCategoryData[] = await this.db.sequelize.query(
            "SELECT SUM(a.amount) AS amount, b.category_id, b.category_name AS title, CONCAT('Lowest Category in ', YEAR(now())) AS description, '/images/category.svg' AS imgpath FROM expenses a " +
                "INNER JOIN expense_categories b ON a.category_id = b.category_id WHERE " +
                "a.user_id = " +
                user_id +
                " AND YEAR(now()) = YEAR(a.expense_date) GROUP BY b.category_id ORDER BY amount ASC LIMIT 1;",
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return [];
        }

        return data;
    };

    public getTotalToday = async (user_id: number): Promise<ITotalTodayData[]> => {
        const data: ITotalTodayData[] = await this.db.sequelize.query(
            `SELECT IFNULL(SUM(amount), 0) AS amount, 'Today' AS title, 'Total' AS description, '/images/moneyhand.svg' AS imgpath FROM expenses 
            WHERE user_id = ${user_id} AND DATE(expense_date) = DATE(now());`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return [];
        }

        return data;
    };

    public getMostSpending = async (user_id: number): Promise<IMostSpendingData[]> => {
        const data: IMostSpendingData[] = await this.db.sequelize.query(
            `SELECT MAX(amount) AS amount, expense_name AS title, CONCAT('Most Spending in ', MONTHNAME(now())) AS description, '/images/expensive2.svg' AS imgpath 
            FROM expenses WHERE user_id = ${user_id} AND DATE_FORMAT(expense_date,'%Y-%m') = DATE_FORMAT(now(),'%Y-%m') 
            GROUP BY title ORDER BY amount DESC LIMIT 1;`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return [];
        }

        return data;
    };

    public getTopFiveCategoriesYearly = async (user_id: number): Promise<ITopFiveCategoriesYearlyDataReturn> => {
        const data: ITopFiveCategoriesYearlyData[] = await this.db.sequelize.query(
            `SELECT IFNULL(SUM(amount), 0) AS amount, b.category_id, b.category_name, YEAR(now()) AS year FROM expenses a 
            INNER JOIN expense_categories b ON a.category_id = b.category_id WHERE a.user_id = ${user_id} 
            GROUP By b.category_id ORDER BY amount DESC LIMIT 5;`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return {};
        }

        const year = data.map((d) => d.year)[0];
        const value = data.map((d) => d.amount);
        const labels = data.map((d) => d.category_name);
        const title = `Top 5 Categories [${year}]`;
        const label = "Categories";

        return { value, labels, title, label };
    };

    public getWeeksOfTheYear = async (user_id: number): Promise<IWeeksOfTheYearDataReturn> => {
        const data: IWeeksOfTheYearData[] = await this.db.sequelize.query(
            `SELECT IFNULL(SUM(amount), 0) as amount, YEAR(expense_date) AS year, WEEK(expense_date) AS week FROM expenses 
            WHERE user_id = ${user_id} AND YEAR(expense_date) = YEAR(now()) GROUP BY
            year, week ORDER BY week ASC;`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return {};
        }

        const year = data.map((d) => d.year)[0];
        const value = data.map((d) => d.amount);
        const labels = data.map((d) => `Week ${d.week}`);
        const title = "All Weeks Total ($)";
        const label = `${year}`;

        return { value, labels, title, label };
    };

    public getCurrentWeek = async (user_id: number): Promise<ICurrentWeekDataReturn> => {
        const data: ICurrentWeekData[] = await this.db.sequelize.query(
            `SELECT IFNULL(SUM(amount), 0) as amount, DAY(expense_date) as day, WEEK(now()) as week, MONTHNAME(now()) as month, 
            YEAR(now()) as year FROM expenses WHERE user_id = ${user_id} 
            AND YEAR(expense_date) = YEAR(now()) AND WEEK(expense_date) = WEEK(now()) GROUP BY year, week, day ORDER BY day ASC;`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return {};
        }

        const year = data.map((d) => d.year)[0];
        const month = data
            .map((d) => d.month)[0]
            .toString()
            .substring(0, 3);
        const week = data.map((d) => d.week)[0];
        const value = data.map((d) => d.amount);
        const labels = data.map((d) => `${d.day}-${month}`);
        const title = "Current Week";
        const label = `Week ${week} [${year}]`;

        return { value, labels, title, label };
    };

    public getTotalMonthsYearly = async (user_id: number): Promise<ITotalMonthsYearlyDataReturn> => {
        const data: ITotalMonthsYearlyData[] = await this.db.sequelize.query(
            `SELECT SUM(amount) AS amount, MONTHNAME(expense_date) AS month, MONTH(expense_date) month_number, YEAR(now()) as year FROM expenses 
            WHERE user_id = ${user_id} AND YEAR(expense_date)=YEAR(now()) GROUP BY month, month_number ORDER BY month_number ASC;`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return {};
        }

        const year = data.map((d) => d.year)[0];
        const value = data.map((d) => d.amount);
        const labels = data.map((d) => d.month.toString().substring(0, 3));
        const title = `Total Monthly, ${year}`;
        const label = `${year}`;

        return { value, labels, title, label };
    };

    /** BUDGET DATA */
    public getCurrentMonthBudget = async (user_id: number) => {
        const data: { amount: number; title: string; description: Buffer; imgpath: string }[] = await this.db.sequelize.query(
            `SELECT (a.total - b.total) AS amount, CONCAT(MONTHNAME(now()),' ','Budget') AS title, CONCAT('Inital budget $',SUM(a.total)) AS description, 
            "/images/budget.svg" AS imgpath FROM( 
                ( SELECT SUM(amount) AS total, DATE_FORMAT(budget_date,'%Y-%m') AS budget_date FROM budget 
                    WHERE user_id = ${user_id} AND DATE_FORMAT(budget_date,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m') GROUP BY DATE_FORMAT(budget_date,'%Y-%m') )a,  
                (SELECT SUM(amount) AS total, DATE_FORMAT(expense_date,'%Y-%m') AS expense_date FROM expenses WHERE user_id = ${user_id} 
                AND DATE_FORMAT(expense_date,'%Y-%m')=DATE_FORMAT(now(),'%Y-%m') GROUP BY DATE_FORMAT(expense_date,'%Y-%m'))b  
            ) GROUP BY amount`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return [];
        }

        const amount = data[0].amount;
        const title = data[0].title;
        const description = data[0].description.toString("utf8");
        const imgpath = data[0].imgpath;

        return [{ amount, title, description, imgpath }];
    };

    public getMonthlyBudgets = async (user_id: number) => {
        const data: {
            amount: number[];
            budget_date: string;
            month: string;
            year: number;
        }[] = await this.db.sequelize.query(
            `SELECT IFNULL(SUM(amount), 0) AS amount, DATE_FORMAT(budget_date,'%Y-%m') AS budget_date, MONTHNAME(budget_date) AS month, YEAR(now()) as year 
             FROM budget WHERE user_id = ${user_id} 
             GROUP BY DATE_FORMAT(budget_date,'%Y-%m'), MONTHNAME(budget_date);`,
            { type: QueryTypes.SELECT },
        );

        if (data.length === 0) {
            return {};
        }

        const year = data.map((d) => d.year)[0];
        const value = data.map((d) => d.amount);
        const labels = data.map((d) => d.month.toString().substring(0, 3));
        const title = `Monthly Budgets ${year}`;
        const label = `${year}`;

        return { value, labels, title, label };
    };

    /** SAVED MONEY */
    public getMoneySaved = async (user_id: number) => {
        const data = await this.db.sequelize.query(
            `SELECT IFNULL((a.total - b.total), 0) AS amount, "Money Saved" AS title, 
            CONCAT('Total ',YEAR(now())) AS description, "/images/pig.svg" AS imgpath FROM(
                ( SELECT SUM(amount) AS total FROM budget WHERE user_id = ${user_id} AND YEAR(budget_date)=YEAR(now()) )a, 
                ( SELECT SUM(amount) AS total FROM expenses WHERE user_id = ${user_id} AND YEAR(expense_date)=YEAR(now()) )b);
            `,
            { type: QueryTypes.SELECT },
        );

        return data;
    };
}
