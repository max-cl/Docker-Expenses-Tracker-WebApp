export interface ExpenseCreate {
    expense_id?: number;
    expense_name: string;
    amount: number;
    img_link: string;
    category_id: number;
    expense_date: Date;
    user_id: number;
}

export interface ExpenseUpdate {
    expense_id: number;
    expense_name: string;
    amount: number;
    img_link: string;
    category_id: number;
    expense_date: Date;
}
