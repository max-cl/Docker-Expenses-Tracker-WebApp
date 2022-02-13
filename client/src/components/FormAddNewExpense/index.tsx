import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

// Components
import Form from '../Common/Controls/Form';
import Input from '../Common/Controls/Input';
import Select from '../Common/Controls/Select';
import DatePicker from '../Common/Controls/DatePicker';
import Button from '../Common/Controls/Button';
import ServerError from '../Common/ServerError';
import ButtonContainer from '../Common/Controls/ButtonContainer';

// Material-UI
import Typography from '@material-ui/core/Typography';

// Interfaces
import { IProps } from './interfaces';

// Utils
import { addServerErrors } from '../utils';

const FormAddNewExpense: React.FC<IProps> = ({
    newExpense,
    handleOnChange,
    handleAdd,
    errorInfo,
    handleOnChangeSelect,
    handleDateChange,
    dataOptions,
    expenseStatus,
    expenseMessage,
}) => {
    // React Hook Form
    const { errors, setError, control, clearErrors } = useForm<typeof newExpense>();

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
                {expenseStatus === 201 && (
                    <div>
                        <Typography color="primary">{expenseMessage}</Typography>
                    </div>
                )}
                <ServerError error={{ id: errorInfo.id, status: errorInfo.status, message: errorInfo.message }} />
                <Input
                    name="expense_name"
                    label="Expense name"
                    required={true}
                    isError={errors.expense_name ? true : false}
                    errorMessage={errors.expense_name ? errors.expense_name.message : ''}
                    handleOnChange={handleOnChange}
                    value={newExpense.expense_name}
                    adornment=""
                    adornmentPosition=""
                    inputType="text"
                    errors={errors.expense_name ? { expense_name: errors.expense_name } : {}}
                    control={control}
                    clearErrors={clearErrors}
                />
                <Select
                    name="category_id"
                    label="Categories"
                    required={true}
                    isError={errors.category_id ? true : false}
                    errorMessage={errors.category_id ? errors.category_id.message : ''}
                    handleOnChange={handleOnChangeSelect}
                    value={newExpense.category_id}
                    errors={errors.category_id ? { category_id: errors.category_id } : {}}
                    control={control}
                    clearErrors={clearErrors}
                    dataOptions={dataOptions}
                />
                <Input
                    name="amount"
                    label="Amount"
                    required={true}
                    isError={errors.amount ? true : false}
                    errorMessage={errors.amount ? errors.amount.message : ''}
                    handleOnChange={handleOnChange}
                    value={newExpense.amount}
                    adornment="$"
                    adornmentPosition="start"
                    inputType="number"
                    errors={errors.amount ? { amount: errors.amount } : {}}
                    control={control}
                    clearErrors={clearErrors}
                />
                <DatePicker
                    name="expense_date"
                    value={newExpense.expense_date}
                    handleDateChange={handleDateChange}
                    errors={errors.expense_date ? { expense_date: errors.expense_date } : {}}
                    isError={errors.expense_date ? true : false}
                    required={true}
                />
                <Input
                    name="img_link"
                    label="Image URL"
                    required={true}
                    isError={errors.img_link ? true : false}
                    errorMessage={errors.img_link ? errors.img_link.message : ''}
                    handleOnChange={handleOnChange}
                    value={newExpense.img_link}
                    adornment=""
                    adornmentPosition=""
                    inputType="text"
                    errors={errors.img_link ? { img_link: errors.img_link } : {}}
                    control={control}
                    clearErrors={clearErrors}
                />
                <ButtonContainer>
                    <Button label="Add" color="primary" isDisabled={false} btnType="submit" />
                </ButtonContainer>
            </>
        </Form>
    );
};

export default FormAddNewExpense;
