import { Response } from "express";

export const applicationJson = "application/json";

export interface ApiResponse {
    <T>(res: Response, data: T, statusCode: number): Response;
}

export interface SuccessResponse<T = any> {
    success: true;
    data: T;
}

export interface FailedResponse<T = any> {
    success: false;
    data: T;
}

export const apiResponse: ApiResponse = (res, data, statusCode): Response => {
    return res.format({
        json: () => {
            res.type(applicationJson);
            res.status(statusCode).send(data);
        },
    });
};

export function successResponse(data: any): SuccessResponse {
    return {
        success: true,
        data,
    };
}

export function failedResponse(data: any): FailedResponse {
    return {
        success: false,
        data,
    };
}
