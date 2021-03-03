export interface IProps<T> {
    name: string;
    label: string;
    required: boolean | undefined;
    handleOnChange: (value: unknown) => void;
    value: number;
    errors: any;
    control: any;
    isError: boolean;
    errorMessage: string | undefined;
    clearErrors: (fieldName: T) => void;
    dataOptions: any[];
}
