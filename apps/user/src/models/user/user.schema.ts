import { Document, Schema } from 'mongoose';
import { max, min } from 'rxjs';
import { UserDocument } from './user.interface';

export const UserSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      min: 5,
      max: 20,
    },
    firstname: String,
    lastname: String,
    gender: { type: String, enum: ['male', 'female'] },
  },
  { timestamps: true, collection: 'User' },
);

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
