import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FractionMembership } from "./FractionMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { CommitteeMembership } from "./CommitteeMembership";
import { Sidejob } from "./Sidejob";

@Index("candidacy_mandate_pkey", ["id"], { unique: true })
@Entity("candidacy_mandate", { schema: "public" })
export class CandidacyMandate {
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

  @Column("integer", { name: "politician_id" })
  public politicianId: number;

  @Column("integer", { name: "party_id", nullable: true })
  public partyId?: number;

  @Column("date", { name: "start_date", nullable: true })
  public startDate?: Date;

  @Column("date", { name: "end_date", nullable: true })
  public endDate?: string;

  @Column("text", { name: "info", nullable: true })
  public info?: string;

  @Column("integer", { name: "electoral_data_id", nullable: true })
  public electoralDataId?: number;

  @ManyToOne(
    () => FractionMembership,
    (fractionMembership) => fractionMembership.candidacyMandates
  )
  @JoinColumn([{ name: "fraction_membership_id", referencedColumnName: "id" }])
  public fractionMembership: FractionMembership;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.candidacyMandates
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  public parliamentPeriod: ParliamentPeriod;

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.candidacyMandate
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
}
