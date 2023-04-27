import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DeleteContentInput {
  @Field(() => String, { nullable: false })
  _id: string;
}
