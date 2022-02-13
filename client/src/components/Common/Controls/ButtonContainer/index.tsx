import React from 'react';

// Styles
import { useStyles } from './styles';

// Interfaces
export interface IProps<T> {
    children: JSX.Element;
    style?: { [K in keyof T]: T };
}

const ButtonContainer: React.FC<IProps<any>> = ({ style, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.buttonContainer} style={style}>
            {children}
        </div>
    );
};

export default ButtonContainer;
