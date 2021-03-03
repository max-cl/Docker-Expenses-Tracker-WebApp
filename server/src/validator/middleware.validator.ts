import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const setError = <T>(
    fieldName: keyof T,
    error: {
        type: string;
        message: string;
    },
) => {
    console.log({ fieldName, error });
};

function addServerErrors<T>(errors: { [P in keyof T]?: string[] }, setError: (fieldName: keyof T, error: { type: string; message: string }) => void) {
    return Object.keys(errors).forEach((key) => {
        setError(key as keyof T, {
            type: "server",
            message: `${errors[key as keyof T]}`,
        });
    });
}

export const middlewareValidatorBody = (schema: Joi.Schema, property: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const options = { abortEarly: false };
            const valid = await schema.validateAsync(req.body, options);
            next();
        } catch (error) {
            const errors = error.details.reduce((acc: any, val: any) => {
                let { path, message } = val;
                return { ...acc, [`${path[0]}`]: message };
            }, {});

            res.status(400).json({ errors, success: false });
        }
    };
};

export const middlewareValidatorParams = (schema: Joi.Schema, property: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const options = { abortEarly: false };
            const valid = await schema.validateAsync(req.params, options);
            next();
        } catch (error) {
            const errors = error.details.reduce((acc: any, val: any) => {
                let { path, message } = val;
                return { ...acc, [`${path[0]}`]: message };
            }, {});

            res.status(400).json({ errors, success: false });
        }
    };
};
