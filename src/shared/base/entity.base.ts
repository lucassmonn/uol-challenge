import { Prop } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export abstract class EntityBase<T> {
  constructor(init?: Partial<T>) {
    Object.assign(this, init);
  }

  public _id?: Types.ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
