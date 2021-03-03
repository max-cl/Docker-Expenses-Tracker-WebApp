import Joi from "joi";

const schemas = {
    getAppDAta: Joi.object().keys({
        user_id: Joi.number().integer().required(),
    }),
};

export default schemas;
