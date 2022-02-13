import React from 'react';
import Button from '@material-ui/core/Button';

// Interfaces
import { IProps } from './intrefaces';

const MyButton: React.FC<IProps<any>> = ({ label, color, isDisabled, btnType, onClick, icon, component, to }) => {
    return (
        <Button
            variant="contained"
            color={color}
            disabled={isDisabled}
            fullWidth
            type={btnType}
            onClick={onClick}
            startIcon={icon}
            component={component}
            to={to}
        >
            {label}
        </Button>
    );
};

export default MyButton;
