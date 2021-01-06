import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const middlewareValidatorBody = (schema: Joi.Schema, property: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const valid = await schema.validateAsync(req.body);
            next();
        } catch (error) {
            console.log("ERROR CATCH: ", error.details[0].message);
            res.status(400).send({
                message: error.details[0].message || "Internal Server Error",
            });
        }
    };
};

export const middlewareValidatorParams = (schema: Joi.Schema, property: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const valid = await schema.validateAsync(req.params);
            next();
        } catch (error) {
            console.log("ERROR CATCH: ", error.details[0].message);
            res.status(400).send({
                message: error.details[0].message || "Internal Server Error",
            });
        }
    };
};
