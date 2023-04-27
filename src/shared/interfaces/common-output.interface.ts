import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageOutput {
  @Field(() => String, { defaultValue: 'success' })
  status?: 'success' | 'error';

  @Field()
  message: string;
}
