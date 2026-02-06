import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'replace_me_with_env_secret';
const ACCESS_EXPIRES = process.env.JWT_ACCESS_EXPIRES_IN ?? '1h';

@Injectable()
export class JwtService {
    signAccessToken(payload: object) {
        return jwt.sign(payload, JWT_SECRET, {
            expiresIn: ACCESS_EXPIRES as any
        })
    }
    verify(token: string) {
        return jwt.verify(token, JWT_SECRET);
    }
}
