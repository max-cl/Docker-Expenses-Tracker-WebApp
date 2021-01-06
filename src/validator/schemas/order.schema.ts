import Joi from "joi";

const schemas = {
    getOrders: Joi.object().keys({
        user_id: Joi.number().integer().required(),
    }),

    createOrder: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        products: Joi.array().items(
            Joi.object().keys({
                quantity: Joi.number().integer().required(),
                product_id: Joi.number().integer().required(),
            }),
        ),
    }),

    getOrderById: Joi.object().keys({
        order_id: Joi.number().integer().required(),
        user_id: Joi.number().integer().required(),
    }),

    updateOrderProduct: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        odetail_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().required(),
    }),

    deleteProductOrder: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        odetail_id: Joi.number().integer().required(),
    }),

    deleteOrder: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        order_id: Joi.number().integer().required(),
    }),
};

export default schemas;
