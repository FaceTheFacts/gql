import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { ParliamentPeriodEnum } from "../enums/entities";
import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";
import { Constituency } from "./Constituency";
import { ElectionProgram } from "./ElectionProgram";
import { ElectoralList } from "./ElectoralList";
import { Fraction } from "./Fraction";
import { Parliament } from "./Parliament";
import { Poll } from "./Poll";

@ObjectType()
@Entity()
export class ParliamentPeriod extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
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

  @Field(() => Parliament)
  @ManyToOne(() => Parliament, (parliament) => parliament.parliamentPeriods)
  public parliament: Parliament;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliamentPeriods,
  )
  public previousPeriod: ParliamentPeriod;

  @OneToMany(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.previousPeriod,
  )
  public parliamentPeriods: ParliamentPeriod[];
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

  @OneToMany(() => Poll, (poll) => poll.fieldLegislature)
  public polls: Poll[];
}
