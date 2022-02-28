import { Field, ID, Int, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { PoliticianSexEnum } from "../enums/entities";
import { Party } from "./Party";
import { PoliticianWeblink } from "./PoliticianWeblink";
import { Position } from "./Position";

registerEnumType(PoliticianSexEnum, {
  name: "PoliticianSexEnum",
});

@ObjectType()
@Entity()
export class Politician extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public id: number;

  @Field()
  @Column("varchar", { name: "entity_type" })
  public entityType: string;

  @Field()
  @Column()
  public label: string;

  @Column("varchar", { name: "api_url" })
  public apiUrl: string;

  @Field()
  @Column("varchar", {
    name: "abgeordnetenwatch_url",
  })
  public abgeordnetenwatchUrl: string;

  @Field()
  @Column("varchar")
  public firstName: string;

  @Field()
  @Column("varchar")
  public lastName: string;

  @Field({ nullable: true })
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

  @Field(() => Party)
  @ManyToOne(() => Party, (party) => party.politicians)
  public party: Party;

  @Field(() => [PoliticianWeblink])
  @OneToMany(
    () => PoliticianWeblink,
    (politicianWeblink) => politicianWeblink.politician,
  )
  public politicianWeblinks: PoliticianWeblink[];

  @Field(() => [Position])
  @OneToMany(() => Position, (position) => position.politician)
  public positions: Position[];
}
