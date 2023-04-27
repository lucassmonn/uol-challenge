import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ResolverBase } from '@shared/base/resolver.base';
import { Types } from 'mongoose';
import { CreateContentInput } from '../inputs/create.input';
import { DeleteContentInput } from '../inputs/delete.input';
import { UpdateContentInput } from '../inputs/update.input';
import { CreateContentUseCase } from '../usecases/create.usecase';
import { DeleteContentUseCase } from '../usecases/delete.usecase';
import { UpdateContentUsecase } from '../usecases/update.usecase';
import { ContentObject } from './content.object';

@Resolver(ContentObject)
export class ContentResolver extends ResolverBase {
  constructor(
    private readonly createContentUseCase: CreateContentUseCase,
    private readonly deleteContentUseCase: DeleteContentUseCase,
    private readonly updateContentUseCase: UpdateContentUsecase,
  ) {
    super();
  }

  @Mutation(() => ContentObject)
  async createContent(
    @Args('input') input: CreateContentInput,
  ): Promise<ContentObject> {
    return await this.callUseCase(this.createContentUseCase, input);
  }

  @Mutation(() => ContentObject)
  async updateContent(
    @Args('input') input: UpdateContentInput,
  ): Promise<ContentObject> {
    return await this.callUseCase(this.updateContentUseCase, input);
  }

  @Mutation(() => ContentObject)
  async deleteContent(
    @Args('input') input: DeleteContentInput,
  ): Promise<ContentObject> {
    return await this.callUseCase(
      this.deleteContentUseCase,
      new Types.ObjectId(input._id),
    );
  }
}
