import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Passport } from './passport.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
    readonly id: string;

    @Prop({ required: true })
    readonly email: string;

    @Prop({ required: true })
    readonly username: string;

    @Prop({ type: Passport })
    readonly passport: Passport;
}

export const usersSchema = SchemaFactory.createForClass(User);

usersSchema.loadClass(User);
