import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import DatePicker from '../Common/Controls/DatePicker';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';

// Material-UI
import Typography from '@material-ui/core/Typography';

// Interfaces
import { IProps } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

const FormAddBudget: React.FC<IProps> = ({ newBudget, handleOnChange, handleAdd, errorInfo, handleDateChange, newBudgetResponse }) => {
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof newBudget>();

    useEffect(() => {
        // Error mangement
        clearErrors(); // Clear "error" variable from React Hook Form
        if (Object.keys(errorInfo.inputFields).length > 0) {
            addServerErrors(errorInfo.inputFields, setError);
        }
    }, [errorInfo.inputFields, clearErrors, setError]);

    return (
        <Form onSubmit={handleAdd}>
            <>
                {newBudgetResponse.budgetStatus === 201 && (
                    <div>
                        <Typography color="primary">{newBudgetResponse.budgetMessage}</Typography>
                    </div>
                )}
                <ServerError error={{ id: errorInfo.id, status: errorInfo.status, message: errorInfo.message }} />
                <Input
                    name="amount"
                    label="Amount"
                    required={true}
                    isError={errors.amount ? true : false}
                    errorMessage={errors.amount ? errors.amount.message : ''}
                    handleOnChange={handleOnChange}
                    value={newBudget.amount}
                    adornment="$"
                    adornmentPosition="start"
                    inputType="number"
                    errors={errors.amount ? { amount: errors.amount } : {}}
                    control={control}
                    clearErrors={clearErrors}
                />
                <DatePicker
                    name="budget_date"
                    value={newBudget.budget_date}
                    handleDateChange={handleDateChange}
                    errors={errors.budget_date ? { budget_date: errors.budget_date } : {}}
                    isError={errors.budget_date ? true : false}
                    required={true}
                />
                <Button label="Add" color="primary" isDisabled={false} btnType="submit" />
            </>
        </Form>
    );
};

export default FormAddBudget;
