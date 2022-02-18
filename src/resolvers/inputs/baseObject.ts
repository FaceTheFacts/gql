import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedResult {
  @Field()
  public hasMore: boolean;

  @Field(() => Int)
  public totalCount: number;
}
