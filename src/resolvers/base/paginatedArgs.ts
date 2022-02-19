import { Max } from "class-validator";
import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int)
  public offset: number;

  @Field(() => Int)
  @Max(100)
  public limit: number;
}
