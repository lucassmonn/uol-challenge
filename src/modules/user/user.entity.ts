import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from '@shared/base/entity.base';
import { Document } from 'mongoose';
import { RoleEnum } from './enum/role.enum';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class UserEntity extends BaseEntity<UserEntity> {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    type: String,
    enum: RoleEnum,
    default: RoleEnum.user,
  })
  role: RoleEnum;
}

export type UserDocument = UserEntity & Document;

export const UserSchema = SchemaFactory.createForClass(UserEntity);
