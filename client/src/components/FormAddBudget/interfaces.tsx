export interface IProps {
    newBudget: {
        amount: number;
        budget_date: Date | null;
    };
    handleOnChange: (name: string, value: string) => void;
    handleAdd: () => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
    handleDateChange: (date: Date | null) => void;
    newBudgetResponse: {
        budgetStatus: number;
        budgetMessage: string;
    };
}
