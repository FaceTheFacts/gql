import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CommitteeMembershipRoleEum } from "../enums/entities";
import { CandidacyMandate } from "./CandidacyMandate";
import { Committee } from "./Committee";

@Entity()
export class CommitteeMembership extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("date", { nullable: true })
  public start_date?: Date;

  @Column("date", { nullable: true })
  public end_date?: Date;

  @ManyToOne(() => Committee, (committee) => committee.committeeMemberships)
  public committee: Committee;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.committeeMemberships,
  )
  public candidacyMandate: CandidacyMandate;

  @Column({
    type: "enum",
    enum: CommitteeMembershipRoleEum,
  })
  public committeeRole: CommitteeMembershipRoleEum;
}
