export interface IExpenseSelected {
    expense_id: number;
    expense_name: string;
    amount: number;
    category_id: number;
    expense_date: Date | null;
    img_link: string;
}

export interface INewExpense {
    expense_name: string;
    amount: number;
    category_id: number;
    expense_date: Date | null;
    img_link: string;
}
