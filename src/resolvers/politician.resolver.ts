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

import { Politician } from "../entities/Politician";
import type { IContext } from "../types/server";
import { PaginatedArgs } from "./inputs/baseArgs";
import { PaginatedResult } from "./inputs/baseObject";

@ArgsType()
class GetPaginatedPoliticians extends PaginatedArgs {}

@ObjectType()
class PaginatePoliticians extends PaginatedResult {
  @Field(() => [Politician])
  politicians: Politician[];
}

@Resolver(Politician)
export class PoliticianResolver {
  @Query(() => PaginatePoliticians, { description: "Returns politicians" })
  public async politicians(
    @Args() { offset, limit }: GetPaginatedPoliticians,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<PaginatePoliticians> {
    const { loader } = ctx;

    const [politicians, totalCount] = await loader
      .loadEntity(Politician, "politician")
      .info(info, "politicians")
      .paginate({ offset, limit })
      .order({ id: "ASC" })
      .loadPaginated();

    return {
      politicians,
      hasMore: offset + limit < totalCount,
      totalCount,
    };
  }
}
