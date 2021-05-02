import { HttpException } from 'utils/http-exception';
import { Request, Response, NextFunction } from 'express';

// Utils
import { apiResponse, failedResponse } from 'utils/response';

export const errorHandler = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message || 'Internal Server Problem .';
    return apiResponse(response, failedResponse(message), status);
};
