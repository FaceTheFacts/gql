import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";

@Entity()
export class CommitteeMembership extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public committeeRole: string;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.committeeMemberships,
  )
  public candidacyMandate: CandidacyMandate;

  @ManyToOne(() => Committee, (committee) => committee.committeeMemberships)
  public committee: Committee;
}
