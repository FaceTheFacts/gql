import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";
import { Constituency } from "./Constituency";
import { ElectionProgram } from "./ElectionProgram";
import { ElectoralList } from "./ElectoralList";
import { Fraction } from "./Fraction";
import { Parliament } from "./Parliament";
import { Poll } from "./Poll";
import { Position } from "./Position";

@Entity()
export class ParliamentPeriod extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public abgeordnetenwatchUrl: string;

  @Column("varchar")
  public type: string;

  @Column("date", { nullable: true })
  public electionDate?: string;

  @Column("date")
  public startDatePeriod: string;

  @Column("date")
  public endDatePeriod: string;

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.parliamentPeriod,
  )
  public candidacyMandates: CandidacyMandate[];

  @OneToMany(() => Committee, (committee) => committee.fieldLegislature)
  public committees: Committee[];

  @OneToMany(
    () => ElectionProgram,
    (electionProgram) => electionProgram.parliamentPeriod,
  )
  public electionPrograms: ElectionProgram[];

  @OneToMany(
    () => ElectoralList,
    (electoralList) => electoralList.parliamentPeriod,
  )
  public electoralLists: ElectoralList[];

  @OneToMany(() => Fraction, (fraction) => fraction.legislature)
  public fractions: Fraction[];

  @OneToMany(() => Parliament, (parliament) => parliament.currentProject)
  public parliaments: Parliament[];

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

  @OneToMany(() => Poll, (poll) => poll.fieldLegislature)
  public polls: Poll[];

  @OneToMany(() => Position, (position) => position.parliamentPeriod)
  public positions: Position[];

  @OneToMany(
    () => Constituency,
    (constituency) => constituency.parliamentPeriod,
  )
  public constituencies: Constituency[];
}
