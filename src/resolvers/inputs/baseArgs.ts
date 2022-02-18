import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int)
  public offset: number;

  @Field(() => Int)
  public limit: number;
}
