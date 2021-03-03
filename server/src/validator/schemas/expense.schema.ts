import Joi from "joi";

const schemas = {
    getAllExpenses: Joi.object().keys({
        user_id: Joi.number().integer().required(),
    }),

    createExpense: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        expense_name: Joi.string().required().messages({
            "string.base": "[expense_name] should be a type of 'text'",
            "string.empty": "[expense_name] cannot be an empty field",
            "any.required": "[expense_name] is a required field",
        }),
        amount: Joi.number().integer().min(1).required().messages({
            "number.base": "[amount] should be a type of 'number'",
            "number.empty": "[amount] cannot be an empty field",
            "number.min": "[amount] should have a minimum length of {#1}",
            "any.required": "[amount] is a required field",
        }),
        category_id: Joi.number().integer().min(1).required().messages({
            "number.base": "[category_id] should be a type of 'number'",
            "number.empty": "[category_id] cannot be an empty field",
            "number.min": "[category_id] should have a minimum length of {#1}",
            "any.required": "[category_id] is a required field",
        }),
        expense_date: Joi.string().required().messages({
            "string.base": "[expense_date] should be a type of 'text'",
            "string.empty": "[expense_date] cannot be an empty field",
            "any.required": "[expense_date] is a required field",
        }),
        img_link: Joi.string().required().messages({
            "string.base": "[img_link] should be a type of 'text'",
            "string.empty": "[img_link] cannot be an empty field",
            "any.required": "[img_link] is a required field",
        }),
    }),

    getExpenseById: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        expense_id: Joi.number().integer().required(),
    }),

    updateExpense: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        expense_id: Joi.number().integer().required(),
        category_id: Joi.number().integer().min(1).required(),
        expense_name: Joi.string().required(),
        expense_date: Joi.string().required(),
        amount: Joi.number().integer().required(),
        img_link: Joi.string().required(),
    }),

    deleteExpense: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        expense_id: Joi.number().integer().required(),
    }),
};

export default schemas;
