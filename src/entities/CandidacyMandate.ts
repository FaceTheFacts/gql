import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CandidacyMandateTypeEnum } from "../enums/entities";
import { CommitteeMembership } from "./CommitteeMembership";
import { ElectoralData } from "./ElectoralData";
import { FractionMembership } from "./FractionMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { Party } from "./Party";
import { Politician } from "./Politician";
import { Sidejob } from "./Sidejob";
import { Vote } from "./Vote";

@Entity()
export class CandidacyMandate extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar", { nullable: true })
  public idExternalAdministration?: string;

  @Column("varchar", { nullable: true })
  public idExternalAdministrationDescription?: string;

  @Column({
    type: "enum",
    enum: CandidacyMandateTypeEnum,
  })
  public type: CandidacyMandateTypeEnum;

  @Column("date", { nullable: true })
  public start_date?: Date;

  @Column("date", { nullable: true })
  public end_date?: Date;

  @Column("varchar", { nullable: true })
  public info?: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.candidacyMandates,
  )
  public parliamentPeriod: ParliamentPeriod;

  @ManyToOne(() => Politician, (politician) => politician.candidacyMandates)
  public politician: Politician;

  @ManyToOne(() => Party, (party) => party.candidacyMandates)
  public party?: Party;

  @OneToOne(() => ElectoralData)
  @JoinColumn()
  public electoralData: ElectoralData;

  @OneToMany(
    () => FractionMembership,
    (fractionMembership) => fractionMembership.candidacyMandate,
  )
  public fractionMemberships: FractionMembership[];

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.candidacyMandate,
  )
  public committeeMemberships: CommitteeMembership[];

  @ManyToOne(() => Sidejob, (sidejob) => sidejob.mandates)
  public sidejob: Sidejob;

  @OneToMany(() => Vote, (vote) => vote.mandate)
  public votes: Vote[];
}
