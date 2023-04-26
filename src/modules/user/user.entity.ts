import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoleEnum } from './enum/role.enum';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class UserEntity extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: String,
    enum: RoleEnum,
    default: RoleEnum.user,
  })
  RoleEnum: RoleEnum;

  @Prop({ select: false, required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
