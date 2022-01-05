import React from 'react';
import { useForm } from 'react-hook-form';

// Styles
import { useStyles } from './styles';

// Interfaces
import { IProps } from './interfaces';

const MyForm: React.FC<IProps> = ({ children, onSubmit }) => {
    // Material UI
    const classes = useStyles();
    // React-Hook-Form
    const { handleSubmit } = useForm();

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            {children}
        </form>
    );
};

export default MyForm;
