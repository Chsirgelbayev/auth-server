import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly username: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    readonly password: string;
}
