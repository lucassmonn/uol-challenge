import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { FilterQuery } from 'mongoose';

interface Pagination {
  page: number;
  perPage: number;
}

export interface WithPagination<E> {
  filter?: FilterQuery<E>;
  pagination?: Pagination;
}

export interface PaginatedOutput<E> {
  data: E[];
  page: number;
  perPage: number;
  total: number;
}

@ObjectType({ isAbstract: true })
export abstract class PaginatedOutputObject {
  @Field(() => Number)
  total: number;

  @Field(() => Number)
  page: number;

  @Field(() => Number)
  perPage: number;
}

@InputType()
export class PaginationInput {
  @Field(() => Number)
  page = 1;

  @Field(() => Number)
  perPage = 10;
}
