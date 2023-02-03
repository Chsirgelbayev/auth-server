import mongoose from 'mongoose';

export interface PassportFindInterface {
    readonly userId: mongoose.Schema.Types.ObjectId;
}
