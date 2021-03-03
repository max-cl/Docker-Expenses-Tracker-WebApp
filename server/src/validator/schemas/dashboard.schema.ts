import Joi from "joi";

const schemas = {
    getDashboardData: Joi.object().keys({
        user_id: Joi.number().integer().required(),
    }),
};

export default schemas;
