import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentEntity, ContentSchema } from './content.entity';
import { ContentRepository } from './content.repository';
import { ContentResolver } from './graphql/content.resolver';
import { CreateContentUseCase } from './usecases/create.usecase';
import { DeleteContentUseCase } from './usecases/delete.usecase';
import { FindOneContentUseCase } from './usecases/find-one.usecase';
import { ListContentsUseCase } from './usecases/list.usecase';
import { UpdateContentUsecase } from './usecases/update.usecase';

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
