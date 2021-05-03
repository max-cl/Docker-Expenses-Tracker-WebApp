import { Response } from 'express';

export const applicationJson = 'application/json';

import { ApiResponse, SuccessResponse, FailedResponse } from 'interfaces/response.interface';

export const apiResponse: ApiResponse = (res, data, statusCode): Response =>
    res.format({
        json: () => {
            res.type(applicationJson);
            res.status(statusCode).send(data);
        },
    });

export const successResponse = (data: any): SuccessResponse => ({ success: true, data });

export const failedResponse = (data: any): FailedResponse => ({ success: false, data });
