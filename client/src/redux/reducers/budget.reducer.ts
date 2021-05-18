import {
    BudgetState,
    BudgetActionTypes,
    CREATE_BUDGET_REQUEST,
    CREATE_BUDGET_SUCCESS,
    CREATE_BUDGET_FAILURE,
    CLEAR_BUDGET_STATES,
} from "../types/budget";

const initialState: BudgetState = {
    message: "",
    status: 0,
    loading: false,
    loaded: false,
};

const budgetState = (state = initialState, action: BudgetActionTypes): BudgetState => {
    switch (action.type) {
        case CREATE_BUDGET_REQUEST:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case CREATE_BUDGET_SUCCESS:
            return {
                ...state,
                message: action.newBudget.message,
                status: action.newBudget.status,
                loading: false,
                loaded: true,
            };

        case CLEAR_BUDGET_STATES:
        case CREATE_BUDGET_FAILURE:
            return {
                ...state,
                message: "",
                status: 0,
                loading: false,
                loaded: false,
            };

        default:
            return state;
    }
};

export default budgetState;
