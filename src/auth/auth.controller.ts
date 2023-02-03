import { Body, Controller, Post, Get, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthJwtGuard } from './guards/auth-jwt.guard';
import { User } from '../users/schema/user.schema';
import { UserDecorator } from '../users/decorator/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    public async login(@Body() loginDto: LoginDto, @Res() res: Response) {
        const { accessToken, refreshToken, cookieSettings } =
            await this.authService.login(loginDto);
        return res
            .cookie('accessToken', accessToken, cookieSettings)
            .cookie('refreshToken', refreshToken, cookieSettings)
            .json({ accessToken, refreshToken });
    }

    @Post('register')
    public async register(
        @Body() registerDto: RegisterDto,
        @Res() res: Response
    ) {
        const { accessToken, refreshToken, cookieSettings } =
            await this.authService.register(registerDto);

        return res
            .cookie('accessToken', accessToken, cookieSettings)
            .cookie('refreshToken', refreshToken, cookieSettings)
            .json({ accessToken, refreshToken });
    }

    @Get('me')
    @UseGuards(AuthJwtGuard)
    public async getMe(@UserDecorator() user: User) {
        return {
            success: true,
            data: user
        };
    }
}
