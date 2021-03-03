import { HttpException } from "utils/http-exception";
import { Request, Response, NextFunction } from "express";

// Utils
import { apiResponse, failedResponse } from "utils/response";

export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message || "It's not you. It's us. We are having some problems.";
    apiResponse(response, failedResponse(message), status);
};
