import { Model } from 'mongoose';

export abstract class RepositoryBase<E> {
  constructor(private readonly model: Model<E>) {}

  async list(): Promise<E[]> {
    return this.model.find();
  }
}
