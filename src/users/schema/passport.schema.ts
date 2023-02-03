import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PassportDocument = Passport & Document;

@Schema({ timestamps: true })
export class Passport {
    @Prop({ required: true, select: false, ref: 'User' })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, select: false })
    protocol: string;

    @Prop({ required: true, select: false })
    password: string;
}

export const passportSchema = SchemaFactory.createForClass(Passport);
