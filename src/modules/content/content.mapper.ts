import { ContentEntity } from './content.entity';
import { ContentObject } from './graphql/content.object';
import { CreateContentInput } from './inputs/create.input';

const mapEntityToObject = (entity: ContentEntity): ContentObject => ({
  _id: entity._id,
  createdAt: entity.createdAt,
  description: entity.description,
  title: entity.title,
  type: entity.type,
  url: entity.url,
  updatedAt: entity.updatedAt,
  viewedBy: entity.viewedBy,
  views: entity.viewedBy.length,
});

const mapEntityToObjectArray = (entities: ContentEntity[]): ContentObject[] =>
  entities.map(mapEntityToObject);

const mapInputCreateToEntity = (input: CreateContentInput): ContentEntity => ({
  description: input.description,
  title: input.title,
  type: input.type,
  url: input.url,
  viewedBy: [],
});

export const contentMapper = {
  mapEntityToObject,
  mapEntityToObjectArray,
  mapInputCreateToEntity,
};
