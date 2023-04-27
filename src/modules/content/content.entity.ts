import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from '@shared/base/entity.base';
import { Types } from 'mongoose';
import { ContentTypeEnum } from './enum/type.enum';

@Schema({
  timestamps: true,
  collection: 'contents',
})
export class ContentEntity extends EntityBase<ContentEntity> {
  @Prop({ type: String, enum: ContentTypeEnum })
  type: ContentTypeEnum;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  viewedBy: Types.ObjectId[];
}

export type ContentDocument = ContentEntity & Document;

export const ContentSchema = SchemaFactory.createForClass(ContentEntity);
