import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  admin = 'admin',
  user = 'user',
}

registerEnumType(RoleEnum, {
  name: 'Role',
});
