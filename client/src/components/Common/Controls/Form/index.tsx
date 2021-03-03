import React from "react";
import { useForm } from "react-hook-form";

// Styles
import { useStyles } from "./styles";

// Interfaces
import { IProps } from "./interfaces";

const MyForm: React.FC<IProps> = ({ children, onSubmit }) => {
    const { handleSubmit } = useForm();
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {children}
        </form>
    );
};

export default MyForm;
