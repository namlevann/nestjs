import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { patternEmail } from 'src/constants/common';
import { ROLE } from '../constants/enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userName: string;
  @Prop({
    required: true,
    IsNotEmpty: true,
    maxLength: 255,
    match: patternEmail,
  })
  email: string;
  @Prop({ required: true, IsNotEmpty: true, minlength: 6 })
  password: string;
  @Prop()
  role: ROLE;
  @Prop()
  avatar: string;
  @Prop({ default: '' })
  address: string;
  @Prop({ default: '' })
  phoneNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
