import { Model } from 'mongoose';

export abstract class RepositoryBase<E> {
  constructor(private readonly model: Model<E>) {}

  async create(entity: E): Promise<E> {
    return this.model.create(entity);
  }

  async list(): Promise<E[]> {
    return this.model.find();
  }
}
