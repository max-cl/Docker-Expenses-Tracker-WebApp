export interface IProps {
    newUser: {
        first_name: string;
        last_name: string;
        username: string;
        password: string;
        repeat_password: string;
        email: string;
        phone: string;
        description: string;
        role_id: number;
    };
    handleOnChange: (name: string, value: string) => void;
    handleSubmit: () => void;
    handleOnChangeSelect: (value: unknown) => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
    newUserResponse: {
        userMessage: string;
        userStatus: number;
    };
    dataOptions: any[];
}
