import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { CommitteeMembership } from "./CommitteeMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { Poll } from "./Poll";
import { Topic } from "./Topic";

@Entity()
export class Committee extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.committees,
  )
  public fieldLegislature: ParliamentPeriod;

  @ManyToMany(() => Topic, (topic) => topic.committees)
  @JoinTable({
    name: "committee_has_topic",
    joinColumns: [{ name: "committee_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  public topics: Topic[];

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.committee,
  )
  public committeeMemberships: CommitteeMembership[];

  @OneToMany(() => Poll, (poll) => poll.fieldCommittees)
  public polls: Poll[];
}
