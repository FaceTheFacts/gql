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
  public static id: number;

  @Column("character varying", { name: "entity_type" })
  public entityType?: string;

  @Column("character varying", { name: "label", nullable: true })
  public label?: string;

  @Column("character varying", { name: "api_url", nullable: true })
  public apiUrl?: string;

  @Column("character varying", {
    name: "id_external_administration",
    nullable: true,
  })
  public idExternalAdministration: string;

  @Column("character varying", {
    name: "id_external_administration_description",
    nullable: true,
  })
  public idExternalAdministrationDescription?: string;

  @Column("character varying", { name: "type", nullable: true })
  type: string | null;

  @Column("integer", { name: "politician_id", nullable: true })
  politicianId: number | null;

  @Column("integer", { name: "party_id", nullable: true })
  partyId: number | null;

  @Column("date", { name: "start_date", nullable: true })
  startDate: string | null;

  @Column("date", { name: "end_date", nullable: true })
  endDate: string | null;

  @Column("character varying", { name: "info", nullable: true })
  info: string | null;

  @Column("integer", { name: "electoral_data_id", nullable: true })
  electoralDataId: number | null;

  @ManyToOne(
    () => FractionMembership,
    (fractionMembership) => fractionMembership.candidacyMandates
  )
  @JoinColumn([{ name: "fraction_membership_id", referencedColumnName: "id" }])
  fractionMembership: FractionMembership;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.candidacyMandates
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  parliamentPeriod: ParliamentPeriod;

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.candidacyMandate
  )
  committeeMemberships: CommitteeMembership[];

  @ManyToMany(() => Sidejob, (sidejob) => sidejob.candidacyMandates)
  @JoinTable({
    name: "sidejob_has_mandate",
    joinColumns: [{ name: "candidacy_mandate_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "sidejob_id", referencedColumnName: "id" }],
    schema: "public",
  })
  sidejobs: Sidejob[];
}
