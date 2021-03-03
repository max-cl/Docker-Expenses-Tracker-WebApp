import React from "react";
import Button from "@material-ui/core/Button";

// Styles
import { useStyles } from "./styles";

// Interfaces
import { IProps } from "./intrefaces";

const MyButton: React.FC<IProps<any>> = ({ label, color, isDisabled, btnType, onClick, icon, component, to, style }) => {
    const classes = useStyles();

    return (
        <div className={classes.buttonContainer} style={style}>
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
        </div>
    );
};

export default MyButton;
