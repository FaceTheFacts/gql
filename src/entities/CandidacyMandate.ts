import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { CommitteeMembership } from "./CommitteeMembership";
import { FractionMembership } from "./FractionMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { Party } from "./Party";
import { Politician } from "./Politician";
import { Sidejob } from "./Sidejob";
import { Vote } from "./Vote";

@Entity()
export class CandidacyMandate extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar", { nullable: true })
  public idExternalAdministration?: string;

  @Column("text", { nullable: true })
  public idExternalAdministrationDescription?: string;

  @Column("varchar")
  public type: string;

  @Column("date", { nullable: true })
  public startDate?: Date;

  @Column("date", { nullable: true })
  public endDate?: string;

  @Column("text", { nullable: true })
  public info?: string;

  @Column("integer", { nullable: true })
  public electoralDataId?: number;

  @Column("integer")
  public politicianId: number;

  @ManyToOne(() => Politician, (politician) => politician.candidacyMandates)
  public politician: Politician;

  @ManyToOne(() => Party, (party) => party.candidacyMandates)
  public party?: Party;

  @ManyToOne(
    () => FractionMembership,
    (fractionMembership) => fractionMembership.candidacyMandates,
  )
  public fractionMembership: FractionMembership;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.candidacyMandates,
  )
  public parliamentPeriod: ParliamentPeriod;

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.candidacyMandate,
  )
  public committeeMemberships: CommitteeMembership[];

  @ManyToMany(() => Sidejob, (sidejob) => sidejob.candidacyMandates)
  @JoinTable({
    name: "sidejob_has_mandate",
    joinColumns: [{ name: "candidacy_mandate_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "sidejob_id", referencedColumnName: "id" }],
    schema: "public",
  })
  public sidejobs: Sidejob[];

  @OneToMany(() => Vote, (vote) => vote.mandate)
  public votes: Vote[];
}
