import type { IGraphQLToolsResolveInfo } from "apollo-server-express";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  FieldResolver,
  Info,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { Cv } from "../entities/Cv";
import { Politician } from "../entities/Politician";
import { Sidejob } from "../entities/Sidejob";
import { Vote } from "../entities/Vote";
import type { IContext } from "../types/server";
import { PaginatedArgs } from "./base/paginatedArgs";
import { PaginatedResult } from "./base/paginatedObject";

@ArgsType()
class GetPaginatedPoliticians extends PaginatedArgs {}

@ObjectType()
class PaginatedPoliticians extends PaginatedResult {
  @Field(() => [Politician])
  politicians: Politician[];
}

@Resolver(() => Politician)
export class PoliticianResolver {
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

  @Query(() => [Politician])
  public async searchPoliticianByName(
    @Arg("name") input: string,
    @Ctx() ctx: IContext,
  ): Promise<Politician[]> {
    const { connection } = ctx;

    const politicians = await connection
      .getRepository(Politician)
      .createQueryBuilder()
      .where("label ILIKE :searchQuery", {
        searchQuery: `%${input}%`,
      })
      .getMany();

    return politicians;
  }

  @Query(() => PaginatedPoliticians)
  public async paginatedPoliticians(
    @Args() { offset, limit }: GetPaginatedPoliticians,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<PaginatedPoliticians> {
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

  @FieldResolver(() => [Sidejob])
  async sidejobs(
    @Root() politician: Politician,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<Sidejob[]> {
    const { loader } = ctx;

    const sidejobs = await loader
      .loadEntity(Sidejob, "sidejob")
      .info(info)
      .ejectQueryBuilder((qb) =>
        qb
          .leftJoin("sidejob.candidacyMandates", "candidacyMandate")
          .where("candidacyMandate.politicianId = :id", {
            id: politician.id,
          }),
      )
      .order({ "sidejob.id": "DESC" })
      .loadMany();

    return sidejobs;
  }

  @FieldResolver(() => [Vote])
  async votes(
    @Root() politician: Politician,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<Vote[]> {
    const { loader } = ctx;

    const [votes] = await loader
      .loadEntity(Vote, "vote")
      .info(info)
      .ejectQueryBuilder((qb) =>
        qb
          .leftJoin("vote.mandate", "candidacyMandate")
          .where("vote.vote != :vote", {
            vote: "no_show",
          })
          .andWhere("candidacyMandate.politicianId = :id", {
            id: politician.id,
          }),
      )
      .paginate({ offset: 0, limit: 10 })
      .order({ "vote.id": "DESC" })
      .loadPaginated();

    return votes;
  }

  @FieldResolver(() => [Cv])
  async cvs(
    @Root() politician: Politician,
    @Ctx() ctx: IContext,
    @Info() info: IGraphQLToolsResolveInfo,
  ): Promise<Cv[]> {
    const { loader } = ctx;

    const cvs = await loader
      .loadEntity(Cv, "cv")
      .info(info)
      .where("cv.politicianId = :id", { id: politician.id })
      .loadMany();

    return cvs;
  }
}
