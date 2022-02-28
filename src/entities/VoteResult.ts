import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Poll } from "./Poll";

@Entity("vote_result", { schema: "public" })
export class VoteResult {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "yes" })
  yes: number;

  @Column("integer", { name: "no" })
  no: number;

  @Column("integer", { name: "abstain" })
  abstain: number;

  @Column("integer", { name: "no_show" })
  noShow: number;

  @ManyToOne(() => Poll, (poll) => poll.voteResults)
  @JoinColumn([{ name: "poll_id", referencedColumnName: "id" }])
  poll: Poll;
}
