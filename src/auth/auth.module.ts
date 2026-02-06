import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { JwtAuthGuard } from './jwt.guard';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, JwtService, JwtAuthGuard],
    controllers: [AuthController],
    exports: [JwtAuthGuard, JwtService],
})
export class AuthModule {}