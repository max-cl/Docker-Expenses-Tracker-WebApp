import { Response } from 'express';

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
