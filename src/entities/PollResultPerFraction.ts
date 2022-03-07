import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Fraction } from "./Fraction";
import { Poll } from "./Poll";

@Entity()
export class PollResultPerFraction extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column("varchar")
  public entityType: string;

  @Column("integer")
  public totalYes: number;

  @Column("integer")
  public totalNo: number;

  @Column("integer")
  public totalAbstain: number;

  @Column("integer")
  public totalNoShow: number;

  @ManyToOne(() => Fraction, (fraction) => fraction.pollResultPerFractions)
  public fraction: Fraction;

  @ManyToOne(() => Poll, (poll) => poll.pollResultPerFractions)
  public poll: Poll;
}
