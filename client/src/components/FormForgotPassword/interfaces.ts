export interface IProps {
    data: {
        email: string;
    };
    handleOnChange: (name: string, value: string) => void;
    handleSubmit: () => void;
    errorInfo: {
        inputFields: any;
        id: string | null;
        status: number | null;
        message?: string | null;
    };
    responseSuccess: {
        responseMessage: string;
        responseStatus: number;
    };
}
