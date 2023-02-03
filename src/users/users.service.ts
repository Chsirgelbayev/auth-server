import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Passport, PassportDocument } from './schema/passport.schema';
import { SaveUserDto } from './dto/save-user.dto';
import { UserFindInterface } from './interfaces/user-find.interface';
import { PassportFindInterface } from './interfaces/passport-find.Interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private readonly usersSchema: Model<UserDocument>,

        @InjectModel(Passport.name)
        private readonly passportSchema: Model<PassportDocument>
    ) {}

    public async findOne(where: UserFindInterface) {
        return this.usersSchema.findOne(where);
    }

    public async saveUser(saveUserDto: SaveUserDto) {
        const user = await this.usersSchema.create(saveUserDto);

        await this.passportSchema.create({
            protocol: 'local',
            password: saveUserDto.password,
            userId: user.id
        });

        return user;
    }

    public async findOnePassport(where: PassportFindInterface) {
        return this.passportSchema.findOne(where).select('+password');
    }
}
