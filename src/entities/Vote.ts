import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { ReasonNoShowEnum, VoteEnum } from "../enums/entities";
import { CandidacyMandate } from "./CandidacyMandate";
import { Fraction } from "./Fraction";
import { Poll } from "./Poll";

@Entity()
export class Vote extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column({
    type: "enum",
    enum: VoteEnum,
  })
  public vote: VoteEnum;

  @Column({
    type: "enum",
    enum: ReasonNoShowEnum,
    nullable: true,
  })
  public reasonNoShow?: ReasonNoShowEnum;

  @Column("varchar", { nullable: true })
  public reasonNoShowOther?: string;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.votes,
  )
  public mandate: CandidacyMandate;

  @ManyToOne(() => Fraction, (fraction) => fraction.votes)
  public fraction: Fraction;

  @ManyToOne(() => Poll, (poll) => poll.votes)
  public poll: Poll;
}
