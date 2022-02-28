import { Field, ID, ObjectType } from "type-graphql";
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

@ObjectType()
@Entity()
export class Committee extends BaseEntity {
  @Field(() => ID)
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

  //   @RelationId((committee: Committee) => committee.fieldTopics)
  //   public fieldTopicIds: number[];

  @ManyToMany(() => Topic, (topic) => topic.committees)
  @JoinTable()
  public fieldTopics: Topic[];

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.committee,
  )
  public committeeMemberships: CommitteeMembership[];

  @OneToMany(() => Poll, (poll) => poll.fieldCommittees)
  public polls: Poll[];
}
