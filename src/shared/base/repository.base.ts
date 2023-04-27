import { PaginatedOutput } from '@shared/interfaces/pagination.interface';
import { FilterQuery, Model } from 'mongoose';

export abstract class RepositoryBase<E> {
  constructor(private readonly model: Model<E>) {}

  async create(entity: E): Promise<E> {
    return await this.model.create(entity);
  }

  async findWithFiltersAndPagination(
    filters?: FilterQuery<E>,
    pagination?: { page: number; perPage: number },
  ): Promise<PaginatedOutput<E>> {
    const skip = pagination ? (pagination.page - 1) * pagination.perPage : 0;
    const query = await this.model
      .find(filters)
      .skip(skip)
      .limit(pagination ? pagination.perPage : 0)
      .exec();

    const total = await this.model.countDocuments(filters).exec();

    return {
      data: query,
      total,
      page: pagination ? pagination.page : 1,
      perPage: pagination ? pagination.perPage : total,
    };
  }
  async find(filter: Partial<E>): Promise<E[]> {
    return await this.model.find(filter).lean();
  }

  async findOne(filter: Partial<E>): Promise<E> {
    return await this.model.findOne(filter).lean();
  }

  async updateOne(filter: Partial<E>, entity: Partial<E>): Promise<E> {
    return await this.model
      .findOneAndUpdate(filter, entity, { new: true })
      .lean();
  }

  async deleteOne(filter: Partial<E>): Promise<{
    deletedCount?: number;
    acknowledged?: boolean;
  }> {
    return await this.model.deleteOne(filter).lean();
  }
}
