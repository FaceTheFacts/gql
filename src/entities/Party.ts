import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { ElectionProgram } from "./ElectionProgram";
import { Politician } from "./Politician";

@ObjectType()
@Entity()
export class Party extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public fullName: string;

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
