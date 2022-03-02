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

import { CandidacyMandate } from "../entities/CandidacyMandate";
import { Politician } from "../entities/Politician";
import { Sidejob } from "../entities/Sidejob";
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

@Resolver(() => Politician)
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

  @FieldResolver(() => [Sidejob])
  async sidejobs(
    @Root() politician: Politician,
    @Ctx() ctx: IContext,
  ): Promise<Sidejob[]> {
    const { connection } = ctx;

    const mandates = await connection.getRepository(CandidacyMandate).find({
      politicianId: politician.id,
    });

    const mandateIds = mandates.map((mandate) => mandate.id);
    // const sidejobs = await connection.getRepository(Sidejob).find();
    const sidejobs = await connection
      .getRepository(Sidejob)
      .createQueryBuilder("sidejob")
      .leftJoinAndSelect("sidejob.candidacyMandates", "candidacyMandate")
      .where("candidacyMandate.id IN (:...ids)", {
        ids: mandateIds,
      })
      .getMany();

    return sidejobs;
  }
}
