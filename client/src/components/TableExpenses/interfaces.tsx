export interface IProps<T> {
    data: { [key in keyof T]: T[key] }[];
    deleteExpense: (expense_id: number) => void;
    editExpense: (expense_id: number) => void;
    expenseCategories: { [key in keyof T]: T[key] }[];
}
