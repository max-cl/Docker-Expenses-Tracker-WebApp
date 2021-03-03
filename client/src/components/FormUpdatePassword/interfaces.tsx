export interface IProps {
    data: {
        password: string;
        repeat_password: string;
    };
    handleOnChange: (name: string, value: string) => void;
    handleSubmit: () => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
}
