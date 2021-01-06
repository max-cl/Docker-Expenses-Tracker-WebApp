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
            username: Joi.string().alphanum().min(3).max(30).required(),

            password: Joi.string().alphanum().min(8).max(30).required(),
        })
        .with("username", "password"),
};

export default schemas;
