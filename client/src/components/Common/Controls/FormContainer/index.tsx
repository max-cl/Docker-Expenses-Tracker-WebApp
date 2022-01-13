import React, { ReactNode } from 'react';

// Styles
import { useStyles } from './styles';

export interface IProps {
    children: ReactNode;
}

const FormContainer: React.FC<IProps> = ({ children }) => {
    // Material UI
    const classes = useStyles();
    return <div className={classes.container}>{children}</div>;
};

export default FormContainer;
