import { Controller, Post, Body, BadRequestException, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JoiValidationPipe } from 'src/pipes/joi-validation.pipe';  
import { registerSchema, loginSchema, forgotSchema, resetSchema } from 'src/validation/auth.schema'
import { JwtAuthGuard } from './jwt.guard';
import type { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body(new JoiValidationPipe(registerSchema)) body: any) {
        return this.authService.register(body);
    }

    @Post('login')
    async login(@Body(new JoiValidationPipe(loginSchema)) body: any) {
        const token = await this.authService.login(body);
        if (!token) throw new BadRequestException('Invalid credentials');
        return { accessToken: token };
    }

    @Post('forgot-password')
    async forgotPassword(@Body(new JoiValidationPipe(forgotSchema)) body: any) {
        const token = await this.authService.forgotPassword(body.email);
        return { resetToken: token };
    }

    @Post('reset-password')
    async resetPassword(@Body(new JoiValidationPipe(resetSchema)) body: any) {
        await this.authService.resetPassword(body.token, body.password);
        return { ok: true };
    }

    @Get('ping')
    ping(){
        return 'ping'
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    async me(@Req() req: Request) {
        const userId = (req as any).user?.sub ?? (req as any).user?.userId ?? (req as any).user;
        return this.authService.getProfile(userId);
    }
}