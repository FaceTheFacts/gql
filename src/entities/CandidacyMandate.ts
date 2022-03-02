import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
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
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("varchar", { name: "entity_type" })
  public entityType: string;

  @Column("varchar", { name: "label" })
  public label: string;

  @Column("varchar", { name: "api_url" })
  public apiUrl: string;

  @Column("varchar", {
    name: "id_external_administration",
    nullable: true,
  })
  public idExternalAdministration?: string;

  @Column("text", {
    name: "id_external_administration_description",
    nullable: true,
  })
  public idExternalAdministrationDescription?: string;

  @Column("varchar", { name: "type" })
  public type: string;

  @Column("date", { name: "start_date", nullable: true })
  public startDate?: Date;

  @Column("date", { name: "end_date", nullable: true })
  public endDate?: string;

  @Column("text", { name: "info", nullable: true })
  public info?: string;

  @Column("integer", { name: "electoral_data_id", nullable: true })
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
  @JoinColumn([{ name: "fraction_membership_id", referencedColumnName: "id" }])
  public fractionMembership: FractionMembership;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.candidacyMandates,
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
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
