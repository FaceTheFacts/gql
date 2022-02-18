import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";

@Index("committee_membership_pkey", ["id"], { unique: true })
@Entity("committee_membership", { schema: "public" })
export class CommitteeMembership {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", { name: "committee_role", nullable: true })
  committeeRole: string | null;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.committeeMemberships
  )
  @JoinColumn([{ name: "candidacy_mandate_id", referencedColumnName: "id" }])
  candidacyMandate: CandidacyMandate;

  @ManyToOne(() => Committee, (committee) => committee.committeeMemberships)
  @JoinColumn([{ name: "committee_id", referencedColumnName: "id" }])
  committee: Committee;
}
