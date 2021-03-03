import Joi from "joi";

const schemas = {
    getBudget: Joi.object().keys({
        user_id: Joi.number().integer().required(),
    }),

    createBudget: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        amount: Joi.number().integer().min(1).required().messages({
            "number.base": "[amount] should be a type of 'number'",
            "number.empty": "[amount] cannot be an empty field",
            "number.min": "[amount] should have a minimum length of {#1}",
            "any.required": "[amount] is a required field",
        }),
        budget_date: Joi.string().required().messages({
            "string.base": "[expense_date] should be a type of 'text'",
            "string.empty": "[expense_date] cannot be an empty field",
            "any.required": "[expense_date] is a required field",
        }),
    }),
};

export default schemas;
