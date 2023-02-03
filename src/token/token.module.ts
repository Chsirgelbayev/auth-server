import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt/jwt-config.service';
import { JwtConfigModule } from 'src/config/jwt/jwt-config.module';
import { TokenService } from './token.service';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useClass: JwtConfigService
        }),
        JwtConfigModule
    ],
    controllers: [],
    providers: [TokenService],
    exports: [JwtModule, TokenService]
})
export class TokenModule {}
