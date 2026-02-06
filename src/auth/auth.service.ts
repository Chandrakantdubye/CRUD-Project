import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from './jwt.service';
import { signPasswordResetToken, verifyPasswordResetToken } from 'src/utils/jwt.util';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private usersRepo: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async register(dto: {email: string, password: string}) {
        const exists = await this.usersRepo.findOne({ where: { email: dto.email } });
        if(exists) throw new BadRequestException('Email already in use');

        const hash = await bcrypt.hash(dto.password, 10);
        const user = this.usersRepo.create({ email: dto.email, password: hash });
        await this.usersRepo.save(user);

        return { id: user.id, email: user.email };
    }

    async login(dto: { email: string, password: string }) {
        const user = await this.usersRepo.findOne({where: { email: dto.email } });
        if (!user) return null;

        const ok = await bcrypt.compare(dto.password, user.password);
        if (!ok) return null;

        return this.jwtService.signAccessToken({ sub: user.id, email: user.email });
    }

    async forgotPassword(email: string) {
        const user = await this.usersRepo.findOne({ where: { email } });
        if(!user) throw new BadRequestException('No user');
        return signPasswordResetToken({ userId: user.id, email: user.email });
    }

    async resetPassword(token: string, newPassword: string) {
        const payload = verifyPasswordResetToken(token);
        const user = await this.usersRepo.findOne({ where: { id: payload.userId } as FindOptionsWhere<User>});
        if(!user) throw new BadRequestException('Invalid token user');
        user.password = await bcrypt.hash(newPassword, 10);
        await this.usersRepo.save(user);
        return { ok: true };
    }

    async getProfile(id: string) {
        const user = await this.usersRepo.findOne({ where: { id } as FindOptionsWhere<User> });
        if (!user) throw new BadRequestException('User not found');
        return { id: user.id, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt };
    }
}