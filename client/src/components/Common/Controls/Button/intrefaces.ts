type color = 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
type button = 'button' | 'submit' | 'reset' | undefined;

export interface IProps<T> {
    label: string;
    color: color;
    isDisabled: boolean;
    btnType: button;
    onClick?: () => void;
    icon?: JSX.Element;
    component?: T;
    to?: string;
}
