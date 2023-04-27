import { Model } from 'mongoose';

export abstract class RepositoryBase<E> {
  constructor(private readonly model: Model<E>) {}

  async create(entity: E): Promise<E> {
    return await this.model.create(entity);
  }

  async find(filter: Partial<E>): Promise<E[]> {
    return await this.model.find(filter).lean();
  }

  async findOne(filter: Partial<E>): Promise<E> {
    return await this.model.findOne(filter).lean();
  }

  async updateOne(filter: Partial<E>, entity: Partial<E>): Promise<E> {
    return await this.model.updateOne(filter, entity).lean();
  }

  async deleteOne(filter: Partial<E>): Promise<{
    deletedCount?: number;
    acknowledged?: boolean;
  }> {
    return await this.model.deleteOne(filter).lean();
  }
}
