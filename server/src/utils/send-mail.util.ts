import 'dotenv/config';
import { Response } from 'express';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

// Utils
import { apiResponse, successResponse, failedResponse } from 'utils/response.util';

// Interfaces
import { ImailOptions } from 'interfaces/auth.interface';

export const createTransporterEmail = (serviceType: string) => {
    const transporter = nodemailer.createTransport({
        service: serviceType,
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
    });

    return transporter;
};

export const sendMail = (transporter: Mail, mailOptions: ImailOptions, email: string, res: Response) =>
    transporter.sendMail(mailOptions, (error, response) =>
        error
            ? apiResponse(res, failedResponse('Error sending email... :('), 400)
            : apiResponse(res, successResponse(`Email has been sent to you (${email}), for reseting your password`), 200)
    );

/** TODO: Standard MailOptions  */
export const forgotPasswordMailOptions = (email: string, token: string): ImailOptions => ({
    from: 'info@randomemail.dk',
    to: `${email}`,
    subject: 'Link To Reset Password',
    html:
        '<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
        `<a href="${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}">${process.env.FORGOT_PASSWORD_LINK}/resetpassword/${token}</a>\n\n` +
        'If you did not request this, please ignore this email and your password will remain unchanged.</p>\n',
});
