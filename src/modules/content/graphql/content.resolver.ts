import { UserObject } from '@modules/user/graphql/user.object';
import { ListUsersUseCase } from '@modules/user/usecases/list.usecase';
import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ResolverBase } from '@shared/base/resolver.base';
import { AdminGuard } from '@shared/guards/admin.guard';
import { JwtGuard } from '@shared/guards/auth.guard';
import { MessageOutput } from '@shared/interfaces/common-output.interface';
import { FilterQuery, Types } from 'mongoose';
import { ContentEntity } from '../content.entity';
import { CreateContentInput } from '../inputs/create.input';
import { DeleteContentInput } from '../inputs/delete.input';
import { ListContentInput } from '../inputs/list.input';
import { UpdateContentInput } from '../inputs/update.input';
import { CreateContentUseCase } from '../usecases/create.usecase';
import { DeleteContentUseCase } from '../usecases/delete.usecase';
import { ListContentsUseCase } from '../usecases/list.usecase';
import { UpdateContentUsecase } from '../usecases/update.usecase';
import { ContentObject, PaginatedContentObject } from './content.object';

@Resolver(ContentObject)
export class ContentResolver extends ResolverBase {
  constructor(
    private readonly createContentUseCase: CreateContentUseCase,
    private readonly deleteContentUseCase: DeleteContentUseCase,
    private readonly updateContentUseCase: UpdateContentUsecase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly listContentsUseCase: ListContentsUseCase,
  ) {
    super();
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Mutation(() => ContentObject)
  async createContent(
    @Args('input') input: CreateContentInput,
  ): Promise<ContentObject> {
    return await this.callUseCase(this.createContentUseCase, input);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Mutation(() => ContentObject)
  async updateContent(
    @Args('input') input: UpdateContentInput,
  ): Promise<ContentObject> {
    return await this.callUseCase(this.updateContentUseCase, input);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Mutation(() => MessageOutput)
  async deleteContent(
    @Args('input') input: DeleteContentInput,
  ): Promise<MessageOutput> {
    return await this.callUseCase(
      this.deleteContentUseCase,
      new Types.ObjectId(input._id),
    );
  }

  @ResolveField(() => [UserObject])
  async viewedBy(@Parent() content: ContentObject): Promise<UserObject[]> {
    if (!content.viewedBy.length) return [];

    return await this.callUseCase(this.listUsersUseCase, {
      filter: { _id: { $in: content.viewedBy } },
    });
  }

  @Query(() => PaginatedContentObject)
  async contents(
    @Args('input') input: ListContentInput,
  ): Promise<PaginatedContentObject> {
    return await this.callUseCase(this.listContentsUseCase, {
      filter: this.buildFilter(input),
      pagination: input.pagination,
    });
  }

  private buildFilter(input: ListContentInput): FilterQuery<ContentEntity> {
    const filter: FilterQuery<ContentEntity> = {};

    if (input.type) {
      filter.type = input.type;
    }

    return filter;
  }
}
