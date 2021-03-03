export interface IHighestCategoryData {
    amount: number;
    category_id: number;
    title: string;
    description: string;
    imgpath: string;
}

export interface ILowestCategoryData {
    amount: number;
    category_id: number;
    title: string;
    description: string;
    imgpath: string;
}

export interface ITotalTodayData {
    amount: number;
    title: string;
    description: string;
    imgpath: string;
}

export interface IMostSpendingData {
    amount: string;
    title: string;
    description: string;
    imgpath: string;
}

export interface ITopFiveCategoriesYearlyData {
    year: number;
    amount: number;
    category_id: number;
    category_name: string;
}

export interface IWeeksOfTheYearData {
    amount: number;
    week: number;
    year: number;
}

export interface ICurrentWeekData {
    amount: number;
    day: number;
    year: number;
    month: number;
    week: number;
}

export interface ITotalMonthsYearlyData {
    amount: number;
    month: string;
    year: number;
}

export interface ITopFiveCategoriesYearlyDataReturn {
    value?: number[];
    labels?: string[];
    title?: string;
    label?: string;
}

export interface IWeeksOfTheYearDataReturn {
    value?: number[];
    labels?: string[];
    title?: string;
    label?: string;
}

export interface ICurrentWeekDataReturn {
    value?: number[];
    labels?: string[];
    title?: string;
    label?: string;
}

export interface ITotalMonthsYearlyDataReturn {
    value?: number[];
    labels?: string[];
    title?: string;
    label?: string;
}
