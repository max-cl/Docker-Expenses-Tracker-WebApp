export interface IProps<T> {
    name: string;
    label: string;
    required?: boolean;
    handleOnChange: (name: string, value: string) => void;
    value: string | number;
    adornment?: string | JSX.Element;
    adornmentPosition?: string;
    inputType: string;
    errors: T;
    control: T;
    isError: boolean;
    errorMessage?: string;
    clearErrors: (fieldName: T) => void;
    multiline?: boolean;
}
