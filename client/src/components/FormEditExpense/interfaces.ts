export interface IProps {
    expenseSelected: {
        expense_id: number;
        expense_name: string;
        amount: number;
        category_id: number;
        expense_date: Date | null;
        img_link: string;
    };
    handleOnChange: (name: string, value: string) => void;
    handleUpdate: () => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
    handleOnChangeSelect: (value: unknown) => void;
    handleDateChange: (date: Date | null) => void;
    dataOptions: { category_id: number; category_name: string; createdAt: string; updatedAt: string; deletedAt: null }[];
    expenseStatus: number;
    expenseMessage: string;
}
