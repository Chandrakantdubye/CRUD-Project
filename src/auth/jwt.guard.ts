import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "./jwt.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest();
        const auth = req.headers?.authorization;
        if (!auth || !auth.startsWith('Bearer ')) throw new UnauthorizedException('Missing or malformed token'); 
        try {
            const payload = this.jwtService.verify(auth.split(' ')[1]);
            req.user = payload;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
}