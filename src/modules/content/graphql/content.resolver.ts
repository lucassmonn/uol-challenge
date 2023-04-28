import { UserObject } from '@modules/user/graphql/user.object';
import { ListUsersUseCase } from '@modules/user/usecases/list.usecase';
import { UserEntity } from '@modules/user/user.entity';
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
import { CurrentUser } from '@shared/decorators/current-user.decorator';
import { AdminGuard } from '@shared/guards/admin.guard';
import { JwtGuard } from '@shared/guards/auth.guard';
import { MessageOutput } from '@shared/interfaces/common-output.interface';
import { FilterQuery, Types } from 'mongoose';
import { ContentEntity } from '../content.entity';
import {
  CreateContentInput,
  DeleteContentInput,
  ListContentInput,
  UpdateContentInput,
} from '../inputs';
import {
  CreateContentUseCase,
  DeleteContentUseCase,
  FindOneContentUseCase,
  ListContentsUseCase,
  UpdateContentUsecase,
} from '../usecases';
import { ContentObject, PaginatedContentObject } from './content.object';

@Resolver(ContentObject)
export class ContentResolver extends ResolverBase {
  constructor(
    private readonly createContentUseCase: CreateContentUseCase,
    private readonly deleteContentUseCase: DeleteContentUseCase,
    private readonly updateContentUseCase: UpdateContentUsecase,
    private readonly listUsersUseCase: ListUsersUseCase,
    private readonly listContentsUseCase: ListContentsUseCase,
    private readonly findOneContentUseCase: FindOneContentUseCase,
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

  @UseGuards(JwtGuard)
  @Query(() => PaginatedContentObject)
  async contents(
    @Args('input') input: ListContentInput,
  ): Promise<PaginatedContentObject> {
    return await this.callUseCase(this.listContentsUseCase, {
      filter: this.buildFilter(input),
      pagination: input.pagination,
    });
  }

  @UseGuards(JwtGuard)
  @Query(() => ContentObject)
  async content(
    @Args('_id') _id: string,
    @CurrentUser() user: Partial<UserEntity>,
  ): Promise<ContentObject> {
    return await this.callUseCase(this.findOneContentUseCase, {
      input: { _id: new Types.ObjectId(_id) },
      user: {
        _id: new Types.ObjectId(user._id),
        role: user.role,
      },
    });
  }

  @ResolveField(() => [UserObject])
  async viewedBy(@Parent() content: ContentObject): Promise<UserObject[]> {
    if (!content.viewedBy.length) return [];

    const { data } = await this.callUseCase(this.listUsersUseCase, {
      filter: { _id: { $in: content.viewedBy } },
    });

    return data;
  }

  private buildFilter(input: ListContentInput): FilterQuery<ContentEntity> {
    const filter: FilterQuery<ContentEntity> = {};

    if (input.type) {
      filter.type = input.type;
    }

    return filter;
  }
}
