import Joi from "joi";

const schemas = {
    getAllPoducts: Joi.object().keys({
        user_id: Joi.number().integer().required(),
    }),

    createProduct: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        product_name: Joi.string().required(),
        in_stock: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
        category_id: Joi.number().integer().required(),
    }),

    getProductById: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required(),
    }),

    updateProduct: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required(),
        category_id: Joi.number().integer().required(),
        product_name: Joi.string().required(),
        in_stock: Joi.number().integer().required(),
        price: Joi.number().integer().required(),
    }),

    deleteProduct: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        product_id: Joi.number().integer().required(),
    }),
};

export default schemas;
