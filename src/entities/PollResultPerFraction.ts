import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Fraction } from "./Fraction";
import { Poll } from "./Poll";

@Entity("poll_result_per_fraction", { schema: "public" })
export class PollResultPerFraction {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("integer", { name: "total_yes", nullable: true })
  totalYes: number | null;

  @Column("integer", { name: "total_no", nullable: true })
  totalNo: number | null;

  @Column("integer", { name: "total_abstain", nullable: true })
  totalAbstain: number | null;

  @Column("integer", { name: "total_no_show", nullable: true })
  totalNoShow: number | null;

  @ManyToOne(() => Fraction, (fraction) => fraction.pollResultPerFractions)
  @JoinColumn([{ name: "fraction_id", referencedColumnName: "id" }])
  fraction: Fraction;

  @ManyToOne(() => Poll, (poll) => poll.pollResultPerFractions)
  @JoinColumn([{ name: "poll_id", referencedColumnName: "id" }])
  poll: Poll;
}
