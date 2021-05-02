import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const middlewareValidatorBody = (schema: Joi.Schema, property: string) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const options = { abortEarly: false };
        await schema.validateAsync(req.body, options);
        next();
    } catch (error) {
        const errors = error.details.reduce((acc: any, val: any) => {
            let { path, message } = val;
            return { ...acc, [`${path[0]}`]: message };
        }, {});

        res.status(400).json({ errors, success: false });
    }
};

export const middlewareValidatorParams = (schema: Joi.Schema, property: string) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const options = { abortEarly: false };
        await schema.validateAsync(req.params, options);
        next();
    } catch (error) {
        const errors = error.details.reduce((acc: any, val: any) => {
            let { path, message } = val;
            return { ...acc, [`${path[0]}`]: message };
        }, {});

        res.status(400).json({ errors, success: false });
    }
};
