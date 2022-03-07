import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";

@Entity("committee_membership", { schema: "public" })
export class CommitteeMembership extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("varchar", { name: "entity_type" })
  public entityType: string;

  @Column("varchar", { nullable: true })
  public label: string;

  @Column("varchar", { name: "api_url" })
  public apiUrl: string;

  @Column("varchar", { name: "committee_role" })
  public committeeRole: string;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.committeeMemberships,
  )
  @JoinColumn([{ name: "candidacy_mandate_id", referencedColumnName: "id" }])
  public candidacyMandate: CandidacyMandate;

  @ManyToOne(() => Committee, (committee) => committee.committeeMemberships)
  public committee: Committee;
}
