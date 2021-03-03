import Joi from "joi";

const schemas = {
    signup: Joi.object()
        .keys({
            first_name: Joi.string().min(3).max(30).required(),
            last_name: Joi.string().min(3).max(30).required(),
            phone: Joi.number().integer().min(6).required(),
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().alphanum().min(8).max(30).required(),
            repeat_password: Joi.ref("password"),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "dk", "de", "org"] } })
                .required(),
            description: Joi.string().min(0).max(50),
            roles: Joi.string().required().valid("Admin", "Role_1", "Role_2"),
        })
        .with("password", "repeat_password"),

    signin: Joi.object()
        .keys({
            username: Joi.string().alphanum().min(3).max(20).required().messages({
                "string.base": "[username] should be a type of 'text'",
                "string.empty": "[username] cannot be an empty field",
                "string.min": "[username] should have a minimum length of {#3}",
                "string.max": "[username] should have a maximum length of {#20}",
                "any.required": "[username] is a required field",
            }),

            password: Joi.string().alphanum().min(8).max(30).required().messages({
                "string.base": "[password] should be a type of 'text'",
                "string.empty": "[password] cannot be an empty field",
                "string.min": "[password] should have a minimum length of {#8}",
                "string.max": "[password] should have a maximum length of {#30}",
                "any.required": "[password] is a required field",
            }),
        })
        .with("username", "password"),

    updateUser: Joi.object().keys({
        user_id: Joi.number().integer().required(),
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        phone: Joi.number().integer().min(6).required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "dk", "de", "org"] } })
            .required(),
        description: Joi.string().min(0).max(50),
        // roles: Joi.string().required().valid("Admin", "Role_1", "Role_2"),
    }),

    forgotPassword: Joi.object().keys({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "dk", "de", "org"] } })
            .required(),
    }),

    resetPassword: Joi.object().keys({
        resetpasswordtoken: Joi.string().alphanum().required(),
    }),

    updatePassword: Joi.object().keys({
        username: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().alphanum().min(8).max(30).required(),
        repeat_password: Joi.ref("password"),
        resetpasswordtoken: Joi.string().alphanum().required(),
    }),
};

export default schemas;
