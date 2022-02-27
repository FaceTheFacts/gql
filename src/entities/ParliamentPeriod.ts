import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ParliamentPeriodEnum } from "../enums/entities";
import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";
import { Constituency } from "./Constituency";
import { ElectionProgram } from "./ElectionProgram";
import { ElectoralList } from "./ElectoralList";
import { Fraction } from "./Fraction";
import { Parliament } from "./Parliament";

@ObjectType()
@Entity()
export class ParliamentPeriod extends BaseEntity {
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
  @Column({
    type: "enum",
    enum: ParliamentPeriodEnum,
  })
  public type: ParliamentPeriodEnum;

  @Field(() => Date)
  @Column("date", { nullable: true })
  public electionDate?: Date;

  @Field(() => Date)
  @Column("date", { nullable: true })
  public startDatePeriod: Date;

  @Field(() => Date)
  @Column("date", { nullable: true })
  public endDatePeriod: Date;

  @Field(() => ParliamentPeriod)
  @OneToOne(() => ParliamentPeriod, (previousPeriod) => previousPeriod.id)
  public previousPeriod: ParliamentPeriod;

  @Field(() => Parliament)
  @ManyToOne(() => Parliament, (parliament) => parliament.parliamentPeriods)
  public parliament: Parliament;

  @OneToMany(() => Committee, (committee) => committee.fieldLegislature)
  public committees: Committee[];

  @OneToMany(() => Fraction, (fraction) => fraction.legislature)
  public fractions: Fraction[];

  @OneToMany(
    () => ElectoralList,
    (electoralList) => electoralList.parliamentPeriod,
  )
  public electoralLists: ElectoralList[];

  @OneToMany(
    () => Constituency,
    (constituency) => constituency.parliamentPeriod,
  )
  public constituencies: Constituency[];

  @OneToMany(
    () => ElectionProgram,
    (electionProgram) => electionProgram.parliamentPeriod,
  )
  public electionPrograms: ElectionProgram[];

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.parliamentPeriod,
  )
  public candidacyMandates: CandidacyMandate[];
}
