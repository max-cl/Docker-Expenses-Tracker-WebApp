export interface IProfileInfo {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    phone: string;
    description: string;
}

export interface IAddBudget {
    amount: number;
    budget_date: Date | null;
}
