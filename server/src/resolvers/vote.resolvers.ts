import type { IGraphQLToolsResolveInfo } from "apollo-server-express";
import {
  Args,
  ArgsType,
  Ctx,
  Field,
  Info,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import { Vote } from "../entities/Vote";
import type { IContext } from "../types/server";
import { PaginatedArgs } from "./base/paginatedArgs";
import { PaginatedResult } from "./base/paginatedObject";

@ArgsType()
class GetPaginatedVotes extends PaginatedArgs {
  @Field()
  id: string;
}

@ObjectType()
class PaginateVotes extends PaginatedResult {
  @Field(() => [Vote])
  votes: Vote[];
}

@Resolver(() => Vote)
export class VoteResolver {
  @Query(() => PaginateVotes)
  public async paginateVotesByPolitician(
    @Args() { id, offset, limit }: GetPaginatedVotes,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<PaginateVotes> {
    const { loader } = ctx;

    const [votes, totalCount] = await loader
      .loadEntity(Vote, "vote")
      .info(info, "votes")
      .ejectQueryBuilder((qb) =>
        qb
          .leftJoin("vote.mandate", "candidacyMandate")
          .where("vote.vote != :vote", {
            vote: "no_show",
          })
          .andWhere("candidacyMandate.politicianId = :id", {
            id,
          }),
      )
      .paginate({ offset, limit })
      .loadPaginated();

    return {
      votes,
      hasMore: offset + limit < totalCount,
      totalCount,
    };
  }
}
