import { UserObject } from './graphql/user.object';
import { UserEntity } from './user.entity';

const mapEntityToObject = (entity: UserEntity): UserObject => ({
  _id: entity._id,
  createdAt: entity.createdAt,
  email: entity.email,
  role: entity.role,
  updatedAt: entity.updatedAt,
});

const mapEntityToObjectArray = (entities: UserEntity[]): UserObject[] =>
  entities.map(mapEntityToObject);

export const userMapper = {
  mapEntityToObject,
  mapEntityToObjectArray,
};
