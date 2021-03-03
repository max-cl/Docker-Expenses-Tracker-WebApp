export interface IProps {
    profileInfo: {
        first_name: string;
        last_name: string;
        username: string;
        email: string;
        phone: string;
        description: string;
    };
    handleOnChange: (name: string, value: string) => void;
    handleUpdate: () => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
    userMessage: string;
    userStatus: number;
}
