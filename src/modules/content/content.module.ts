import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContentEntity, ContentSchema } from './content.entity';
import { ContentRepository } from './content.repository';
import { CreateContentUseCase } from './usecases/create.usecase';
import { DeleteContentUseCase } from './usecases/delete.usecase';
import { UpdateContentUsecase } from './usecases/update.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContentEntity.name,
        schema: ContentSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [
    ContentRepository,
    CreateContentUseCase,
    UpdateContentUsecase,
    DeleteContentUseCase,
  ],
})
export class ContentModule {}
