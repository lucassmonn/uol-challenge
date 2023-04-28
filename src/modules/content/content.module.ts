import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentEntity, ContentSchema } from './content.entity';
import { ContentRepository } from './content.repository';
import { ContentResolver } from './graphql/content.resolver';
import {
  CreateContentUseCase,
  DeleteContentUseCase,
  FindOneContentUseCase,
  ListContentsUseCase,
  UpdateContentUsecase,
} from './usecases';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContentEntity.name,
        schema: ContentSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [],
  providers: [
    ContentRepository,
    CreateContentUseCase,
    UpdateContentUsecase,
    DeleteContentUseCase,
    ListContentsUseCase,
    FindOneContentUseCase,
    ContentResolver,
  ],
})
export class ContentModule {}
