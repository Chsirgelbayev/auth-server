import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from 'src/config/jwt/jwt-config.service';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { User } from '../users/schema/user.schema';

@Injectable()
export class TokenService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly jwtConfigService: JwtConfigService
    ) {}

    public async generate(user: JwtPayloadInterface | User) {
        const payload = {
            id: user._id,
            email: user.email
        };

        const accessToken = this.jwtService.sign(payload);

        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.jwtConfigService.expiresInRefreshToken,
            secret: this.jwtConfigService.secretAccessToken
        });

        const cookieSettings = {
            expires: new Date(
                Date.now() +
                    Number(this.jwtConfigService.cookieExpire) *
                        24 *
                        60 *
                        60 *
                        1000
            ),
            httpOnly: true
        };

        return {
            accessToken,
            refreshToken,
            cookieSettings
        };
    }

    public async verifyRefreshToken(
        token: string
    ): Promise<JwtPayloadInterface> {
        return this.jwtService.verify(token);
    }
}
