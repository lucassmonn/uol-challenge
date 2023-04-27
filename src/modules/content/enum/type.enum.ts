import { registerEnumType } from '@nestjs/graphql';

export enum ContentTypeEnum {
  video = 'video',
  pdf = 'pdf',
  image = 'image',
}

registerEnumType(ContentTypeEnum, {
  name: 'ContentType',
});
