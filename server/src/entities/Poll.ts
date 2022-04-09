import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Committee } from "./Committee";
import { FieldRelatedLink } from "./FieldRelatedLink";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { PollResultPerFraction } from "./PollResultPerFraction";
import { Topic } from "./Topic";
import { Vote } from "./Vote";
import { VoteResult } from "./VoteResult";

@ObjectType()
@Entity()
export class Poll extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column("varchar")
  public entityType: string;

  @Field()
  @Column("varchar")
  public label: string;

  @Field()
  @Column("varchar")
  public apiUrl: string;

  @Field({ nullable: true })
  @Column("text", { nullable: true })
  public fieldIntro?: string;

  @Field()
  @Column("date")
  public fieldPollDate: string;

  @OneToMany(
    () => FieldRelatedLink,
    (fieldRelatedLink) => fieldRelatedLink.poll,
  )
  public fieldRelatedLinks: FieldRelatedLink[];

  @ManyToOne(() => Committee, (committee) => committee.polls)
  public fieldCommittees: Committee;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.polls,
  )
  public fieldLegislature: ParliamentPeriod;

  @ManyToMany(() => Topic, (topic) => topic.polls)
  @JoinTable({
    name: "poll_has_topic",
    joinColumns: [{ name: "poll_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  public topics: Topic[];

  @OneToMany(
    () => PollResultPerFraction,
    (pollResultPerFraction) => pollResultPerFraction.poll,
  )
  public pollResultPerFractions: PollResultPerFraction[];

  @OneToMany(() => VoteResult, (voteResult) => voteResult.poll)
  public voteResults: VoteResult[];

  @OneToMany(() => Vote, (vote) => vote.fraction)
  public votes: Vote[];
}
