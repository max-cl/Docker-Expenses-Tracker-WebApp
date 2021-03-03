export interface IProps<T> {
    children: React.ReactNode;
    headInfo: {
        id: number;
        label: string;
        align: "left" | "right" | "inherit" | "center" | "justify" | undefined;
        width: string;
    }[];
}
