import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, usersSchema } from './schema/user.schema';
import { Passport, passportSchema } from './schema/passport.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: usersSchema },
            { name: Passport.name, schema: passportSchema }
        ])
    ],
    providers: [UsersService],
    exports: [UsersService]
})
export class UsersModule {}
