import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Material UI
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

// Components
import TableExpenses from '../../TableExpenses';
import Modal from '../../Common/Modal';
import FormAddNewExpense from '../../FormAddNewExpense';
import FormEditExpense from '../../FormEditExpense';
import Button from '../../Common/Controls/Button';
import Spinner from '../../Common/Spinner';

// Thunks
import { getExpenses, removeExpense, updateExpense, createExpense } from '../../../redux/thunks/expenses.thunk';
import { getAppData } from '../../../redux/thunks/app.thunk';
import { returnErrors, clearErrors, returnErrorsInputFields } from '../../../redux/thunks/error.thunk';

// Actions
import { cleanExpenseResponseSuccess } from '../../../redux/actions/expense.action';

// Interfaces
import { IExpenseSelected, INewExpense } from './interfaces';
import { RootState } from '../../../redux/reducers';

const Expense: React.FC<{}> = () => {
    // React router
    let history = useHistory();
    // To use the actions
    const dispatch = useDispatch();

    // Global States (Redux Store)
    const expenses = useSelector((state: RootState) => state.expense.expenses);
    const expenseMessage = useSelector((state: RootState) => state.expense.message);
    const expenseStatus = useSelector((state: RootState) => state.expense.status);
    const userInfo = useSelector((state: RootState) => state.auth.user);
    const errorInfo = useSelector((state: RootState) => state.error);
    const expenseCategories = useSelector((state: RootState) => state.app.appData.expenseCategories);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Local States
    const [openAddExpense, setOpenAddExpense] = useState<boolean>(false);
    const [openEditExpense, setOpenEditExpense] = useState<boolean>(false);
    const [newExpense, setNewExpense] = useState<INewExpense>({
        expense_name: '',
        amount: 0,
        category_id: 0,
        expense_date: new Date(),
        img_link: 'img_link',
    });
    const [expenseSelected, setExpenseSelected] = useState<IExpenseSelected>({
        expense_id: 0,
        expense_name: '',
        amount: 0,
        category_id: 0,
        expense_date: new Date(),
        img_link: '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            history.push('/login');
        } else {
            if (Object.entries(userInfo).length > 0) {
                dispatch(getAppData(userInfo.user_id));
                dispatch(getExpenses(userInfo.user_id));
            }
        }
    }, [isAuthenticated, userInfo, history, dispatch]);

    const handleOnChangeAddExpense = (name: string, value: string) => {
        setNewExpense({ ...newExpense, [name]: value });
    };

    const handleOnChangeSelectCategoryAddExpense = (value: unknown) => {
        setNewExpense({ ...newExpense, category_id: parseInt(value as string, 10) });
    };

    const handleDateChangeAddExpense = (value: Date | null) => {
        setNewExpense({ ...newExpense, expense_date: value });
    };

    const openModalAddExpense = () => {
        dispatch(cleanExpenseResponseSuccess());
        dispatch(clearErrors());
        setNewExpense({
            expense_name: '',
            amount: 0,
            category_id: 0,
            expense_date: new Date(),
            img_link: 'img_link',
        });
        setOpenAddExpense(!openAddExpense);
    };

    const handleAdd = () => {
        const expenseIds = expenses.map((e: any) => e.expense_id);
        const newExpenseId = Math.max(...expenseIds) + 1;
        dispatch(
            createExpense(
                userInfo.user_id,
                newExpense.expense_name,
                newExpense.category_id,
                newExpense.amount,
                newExpense.expense_date,
                newExpense.img_link,
                newExpenseId
            )
        );
        console.log('newExpense: ', newExpense);
    };

    const deleteExpense = (expense_id: number) => {
        dispatch(removeExpense(userInfo.user_id, expense_id));
        console.log('Expense removed [ID]: ', expense_id);
    };

    const editExpense = (expense_id: number) => {
        dispatch(cleanExpenseResponseSuccess());
        setOpenEditExpense(!openEditExpense);
        let expense = expenses.filter((f: { expense_id: number }) => f.expense_id === expense_id);
        setExpenseSelected(expense[0]);
        console.log('expense selected: ', expense[0]);
        console.log('ID selected: ', expense_id);
    };

    const handleOnChangeEditExpense = (name: string, value: string) => {
        setExpenseSelected({ ...expenseSelected, [name]: value });
    };

    const handleOnChangeSelectUpdateExpense = (value: unknown) => {
        setExpenseSelected({ ...expenseSelected, category_id: parseInt(value as string, 10) });
    };

    const handleDateChangeUpdateExpense = (value: Date | null) => {
        setExpenseSelected({ ...expenseSelected, expense_date: value });
    };

    const handleUpdate = () => {
        dispatch(
            updateExpense(
                userInfo.user_id,
                expenseSelected.expense_id,
                expenseSelected.expense_name,
                expenseSelected.category_id,
                expenseSelected.amount,
                expenseSelected.expense_date,
                expenseSelected.img_link
            )
        );
        console.log(`Expense (${expenseSelected.expense_id}) Updated: `, expenseSelected);
    };

    if (expenses.length === 0 || errorInfo.status === 404) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <Button
                        label="Add Expense"
                        color="secondary"
                        isDisabled={false}
                        onClick={openModalAddExpense}
                        btnType="button"
                        icon={<AddIcon />}
                    />
                    <Typography variant="subtitle1" color="textPrimary" component="h3" align="center">
                        None Expenses added
                    </Typography>
                </div>
                <Modal open={openAddExpense} handleModal={() => setOpenAddExpense(!openAddExpense)}>
                    <FormAddNewExpense
                        newExpense={newExpense}
                        handleOnChange={handleOnChangeAddExpense}
                        handleOnChangeSelect={handleOnChangeSelectCategoryAddExpense}
                        handleDateChange={handleDateChangeAddExpense}
                        handleAdd={handleAdd}
                        errorInfo={errorInfo}
                        dataOptions={expenseCategories}
                        expenseStatus={expenseStatus}
                        expenseMessage={expenseMessage}
                    />
                </Modal>
            </div>
        );
    }
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Modal open={openAddExpense} handleModal={() => setOpenAddExpense(!openAddExpense)}>
                <FormAddNewExpense
                    newExpense={newExpense}
                    handleOnChange={handleOnChangeAddExpense}
                    handleOnChangeSelect={handleOnChangeSelectCategoryAddExpense}
                    handleDateChange={handleDateChangeAddExpense}
                    handleAdd={handleAdd}
                    errorInfo={errorInfo}
                    dataOptions={expenseCategories}
                    expenseStatus={expenseStatus}
                    expenseMessage={expenseMessage}
                />
            </Modal>

            <Modal open={openEditExpense} handleModal={() => setOpenEditExpense(!openEditExpense)}>
                <FormEditExpense
                    expenseSelected={expenseSelected}
                    handleOnChange={handleOnChangeEditExpense}
                    handleUpdate={handleUpdate}
                    errorInfo={errorInfo}
                    handleOnChangeSelect={handleOnChangeSelectUpdateExpense}
                    handleDateChange={handleDateChangeUpdateExpense}
                    dataOptions={expenseCategories}
                    expenseStatus={expenseStatus}
                    expenseMessage={expenseMessage}
                />
            </Modal>
            <Button
                label="Add Expense"
                color="secondary"
                isDisabled={false}
                onClick={openModalAddExpense}
                btnType="button"
                icon={<AddIcon />}
            />
            <TableExpenses data={expenses} deleteExpense={deleteExpense} editExpense={editExpense} expenseCategories={expenseCategories} />
        </div>
    );
};

export default Expense;
