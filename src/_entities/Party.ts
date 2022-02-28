import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { ElectionProgram } from "./ElectionProgram";
import { Politician } from "./Politician";

@ObjectType()
@Entity()
export class Party extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public id: number;

  @Field()
  @Column("varchar", { nullable: true })
  public entityType: string;

  @Field()
  @Column("varchar")
  public label: string;

  @Field()
  @Column("varchar")
  public apiUrl: string;

  @Field()
  @Column("varchar")
  public fullName: string;

  @Field()
  @Column("varchar")
  public shortName: string;

  @Field(() => [Politician])
  @OneToMany(() => Politician, (politician) => politician.party)
  public politicians: Politician[];

  @OneToMany(() => ElectionProgram, (electionProgram) => electionProgram.party)
  public electionPrograms: ElectionProgram[];

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.party,
  )
  public candidacyMandates: CandidacyMandate[];
}
