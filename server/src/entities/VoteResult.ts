import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Poll } from "./Poll";

@Entity()
export class VoteResult extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("integer")
  public yes: number;

  @Column("integer")
  public no: number;

  @Column("integer")
  public abstain: number;

  @Column("integer")
  public noShow: number;

  @ManyToOne(() => Poll, (poll) => poll.voteResults)
  public poll: Poll;
}
