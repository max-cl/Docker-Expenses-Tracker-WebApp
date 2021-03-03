export interface IProps {
    open: boolean;
    handleDrawer: () => void;
    sectionsInfo: {
        label: string;
        path: string;
    }[];
    onSectionClick: (label: string) => void;
    children: JSX.Element;
}
