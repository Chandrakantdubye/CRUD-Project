import { BadRequestException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? 'replace_me_with_env_secret';
const RESET_EXPIRES =  (process.env.PASSWORD_RESET_EXPIRES_IN ?? '1h') as string;

export type PasswordResetPayload = {
    userId: string | number;
    email?: string;
};

export function signPasswordResetToken(payload: PasswordResetPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: RESET_EXPIRES as any
    });
}


export function verifyPasswordResetToken(token: string): PasswordResetPayload {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (typeof decoded === "string" || !decoded) {
            throw new BadRequestException("Invalid or expired password reset token");
        }

        return decoded as PasswordResetPayload;
    } catch (err) {
        throw new BadRequestException("Invalid or expired password reset token");
    }
}

