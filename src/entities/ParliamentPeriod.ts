import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";
import { ElectionProgram } from "./ElectionProgram";
import { ElectoralList } from "./ElectoralList";
import { Fraction } from "./Fraction";
import { Parliament } from "./Parliament";
import { Poll } from "./Poll";
import { Position } from "./Position";

@Entity("parliament_period", { schema: "public" })
export class ParliamentPeriod {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", {
    name: "abgeordnetenwatch_url",
    nullable: true,
  })
  abgeordnetenwatchUrl: string | null;

  @Column("character varying", { name: "type", nullable: true })
  type: string | null;

  @Column("date", { name: "election_date", nullable: true })
  electionDate: string | null;

  @Column("date", { name: "start_date_period", nullable: true })
  startDatePeriod: string | null;

  @Column("date", { name: "end_date_period", nullable: true })
  endDatePeriod: string | null;

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.parliamentPeriod,
  )
  candidacyMandates: CandidacyMandate[];

  @OneToMany(() => Committee, (committee) => committee.fieldLegislature)
  committees: Committee[];

  @OneToMany(
    () => ElectionProgram,
    (electionProgram) => electionProgram.parliamentPeriod,
  )
  electionPrograms: ElectionProgram[];

  @OneToMany(
    () => ElectoralList,
    (electoralList) => electoralList.parliamentPeriod,
  )
  electoralLists: ElectoralList[];

  @OneToMany(() => Fraction, (fraction) => fraction.legislature)
  fractions: Fraction[];

  @OneToMany(() => Parliament, (parliament) => parliament.currentProject)
  parliaments: Parliament[];

  @ManyToOne(() => Parliament, (parliament) => parliament.parliamentPeriods)
  @JoinColumn([{ name: "parliament_id", referencedColumnName: "id" }])
  parliament: Parliament;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliamentPeriods,
  )
  @JoinColumn([{ name: "previous_period_id", referencedColumnName: "id" }])
  previousPeriod: ParliamentPeriod;

  @OneToMany(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.previousPeriod,
  )
  parliamentPeriods: ParliamentPeriod[];

  @OneToMany(() => Poll, (poll) => poll.fieldLegislature)
  polls: Poll[];

  @OneToMany(() => Position, (position) => position.parliamentPeriod)
  positions: Position[];
}
