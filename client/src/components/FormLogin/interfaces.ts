export interface ILogin {
    loginInfo: {
        username: string;
        password: string;
    };
    handleOnChange: (name: string, value: string) => void;
    handleLogin: () => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
}
