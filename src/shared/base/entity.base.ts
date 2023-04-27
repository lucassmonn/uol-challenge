import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export abstract class EntityBase<T> {
  constructor(init?: Partial<T>) {
    Object.assign(this, init);
  }

  public _id?: ObjectId;

  @Prop()
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;
}
