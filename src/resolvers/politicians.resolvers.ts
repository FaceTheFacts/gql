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

import { Politician } from "../entities/Politician";
import type { IContext } from "../types/server";
import { PaginatedArgs } from "./base/paginatedArgs";
import { PaginatedResult } from "./base/paginatedObject";

@ArgsType()
class GetPaginatedPoliticians extends PaginatedArgs {}

@ObjectType()
class PaginatePoliticians extends PaginatedResult {
  @Field(() => [Politician])
  politicians: Politician[];
}

@Resolver(Politician)
export class PoliticiansResolvers {
  @Query(() => Politician, { nullable: true })
  public async politician(
    @Arg("id") id: string,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<Politician | undefined> {
    const { loader } = ctx;

    const politician = loader
      .loadEntity(Politician, "politician")
      .where("politician.id = :id", { id })
      .info(info)
      .loadOne();

    return politician;
  }

  @Query(() => PaginatePoliticians)
  public async paginatedPoliticians(
    @Args() { offset, limit }: GetPaginatedPoliticians,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<PaginatePoliticians> {
    const { loader } = ctx;

    const [politicians, totalCount] = await loader
      .loadEntity(Politician)
      .info(info, "politicians")
      .paginate({ offset, limit })
      .loadPaginated();

    return {
      politicians,
      hasMore: offset + limit < totalCount,
      totalCount,
    };
  }
}
