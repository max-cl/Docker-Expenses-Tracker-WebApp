import { Response } from 'express';
// Utils
import { apiResponse, failedResponse } from 'utils/response.util';
import { logger } from 'utils/logger.util';

export const JWTPassportErrors = (res: Response, err: any, info: any) => {
    if (err) {
        logger.error(`ERROR JWTPassportErrors: ${err}`);
        return apiResponse(res, failedResponse(err), 500);
    }
    if (info) {
        logger.error(`INFO JWTPassportErrors: ${info.message}`);
        return apiResponse(res, failedResponse(info.message), 401);
    }

    return false;
};

export const signUpPassportErrors = (res: Response, err: any, info: any) => {
    if (err) {
        logger.warn(err);
        return apiResponse(res, failedResponse(err), 500);
    }
    if (info !== undefined) {
        logger.warn(info.message);
        return apiResponse(res, failedResponse(info.message), 400);
    }

    return false;
};

export const signInPassportErrors = (res: Response, err: any, info: any) => {
    if (err) {
        logger.error(err);
        return apiResponse(res, failedResponse(err), 500);
    }
    if (info !== undefined) {
        logger.warn(info.message);
        return apiResponse(res, failedResponse(info.message), 404);
    }

    return false;
};
