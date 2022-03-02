import type { IGraphQLToolsResolveInfo } from "apollo-server-express";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  Info,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import { Party } from "../entities/Party";
import type { IContext } from "../types/server";
import { PaginatedArgs } from "./base/paginatedArgs";
import { PaginatedResult } from "./base/paginatedObject";

@ArgsType()
class GetPaginatedParties extends PaginatedArgs {}

@ObjectType()
class PaginateParties extends PaginatedResult {
  @Field(() => [Party])
  parties: Party[];
}

@Resolver(Party)
export class PartyResolver {
  @Query(() => Party, { nullable: true })
  public async party(
    @Arg("id") id: string,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<Party | undefined> {
    const { loader } = ctx;

    const party = loader
      .loadEntity(Party, "party")
      .where("party.id = :id", { id })
      .info(info)
      .loadOne();

    return party;
  }

  @Query(() => PaginateParties)
  public async paginatedParties(
    @Args() { offset, limit }: GetPaginatedParties,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<PaginateParties> {
    const { loader } = ctx;

    const [parties, totalCount] = await loader
      .loadEntity(Party)
      .info(info, "parties")
      .paginate({ offset, limit })
      .loadPaginated();

    return {
      parties,
      hasMore: offset + limit < totalCount,
      totalCount,
    };
  }
}
