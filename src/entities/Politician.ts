import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { PoliticianSexEnum } from "../enums/entities";
import { CandidacyMandate } from "./CandidacyMandate";
import { Party } from "./Party";

registerEnumType(PoliticianSexEnum, {
  name: "PoliticianSexEnum",
});

// The last step is very important: TypeScript has limited reflection ability, so this is a case where we have to explicitly provide the enum type for object type fields, input type fields, args, and the return type of queries and mutations:

@ObjectType()
@Entity()
export class Politician extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column("varchar")
  public entityType: string;

  @Field()
  @Column("varchar")
  public label: string;

  @Field()
  @Column("varchar")
  public apiUrl: string;

  @Field()
  @Column("varchar")
  public abgeordnetenwatchUrl: string;

  @Field()
  @Column("varchar")
  public firstName: string;

  @Field()
  @Column("varchar")
  public lastName: string;

  @Field()
  @Column("varchar", { nullable: true })
  public birthName?: string;

  @Field(() => PoliticianSexEnum, { nullable: true })
  @Column({
    type: "enum",
    enum: PoliticianSexEnum,
    nullable: true,
  })
  public sex?: PoliticianSexEnum;

  @Field(() => Int, { nullable: true })
  @Column("integer", { nullable: true })
  public yearOfBirth?: number;

  @Field(() => Party)
  @ManyToOne(() => Party, (party) => party.politicians)
  public party: Party;

  @Field()
  @Column("varchar", { nullable: true })
  public partyPast?: string;

  @Field()
  @Column("boolean", { nullable: true })
  public deceased?: boolean;

  @Field()
  @Column("date", { nullable: true })
  public deceasedDate?: Date;

  @Field()
  @Column("varchar", { nullable: true })
  public education?: string;

  @Field()
  @Column("varchar", { nullable: true })
  public residence?: string;

  @Field()
  @Column("varchar", { nullable: true })
  public occupation?: string;

  // TODO: convert to number -> Number()
  @Field()
  @Column("integer", { nullable: true })
  public statisticQuestions?: number;

  @Field()
  @Column("integer", { nullable: true })
  public statisticQuestionsAnswered?: number;

  @Field()
  @Column("varchar", { nullable: true })
  public qidWikidata?: string;

  @Field()
  @Column("varchar", { nullable: true })
  public fieldTitle?: string;

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.politician,
  )
  public candidacyMandates: CandidacyMandate[];
}
