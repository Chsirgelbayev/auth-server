import {
    BadRequestException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { TokenService } from 'src/token/token.service';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokensService: TokenService
    ) {}

    public async validateUser(
        email: string,
        password: string
    ): Promise<User | UserDocument> {
        const user = await this.usersService.findOne({ email });
        const passport = await this.usersService.findOnePassport({
            userId: user._id
        });

        if (!user) {
            throw new BadRequestException('Пользователь не найден');
        }

        const isMatch: boolean = await bcrypt.compare(
            password,
            passport.password
        );

        if (!isMatch) {
            throw new UnauthorizedException(
                'Введены неправильные учетные данные'
            );
        }

        return user;
    }

    public async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        return this.tokensService.generate(user);
    }

    public async register(registerDto: RegisterDto) {
        const salt: string = await bcrypt.genSalt(10);
        const password: string = await bcrypt.hash(registerDto.password, salt);

        const user = await this.usersService.saveUser({
            ...registerDto,
            password
        });

        return this.tokensService.generate(user);
    }
}
