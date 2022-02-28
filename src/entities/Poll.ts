import {
  Column,
  Entity,
  JoinColumn,
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
import { VoteResult } from "./VoteResult";

@Entity("poll", { schema: "public" })
export class Poll {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("text", { name: "field_intro", nullable: true })
  fieldIntro: string | null;

  @Column("date", { name: "field_poll_date", nullable: true })
  fieldPollDate: string | null;

  @OneToMany(
    () => FieldRelatedLink,
    (fieldRelatedLink) => fieldRelatedLink.poll,
  )
  fieldRelatedLinks: FieldRelatedLink[];

  @ManyToOne(() => Committee, (committee) => committee.polls)
  @JoinColumn([{ name: "field_committees_id", referencedColumnName: "id" }])
  fieldCommittees: Committee;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.polls,
  )
  @JoinColumn([{ name: "field_legislature_id", referencedColumnName: "id" }])
  fieldLegislature: ParliamentPeriod;

  @ManyToMany(() => Topic, (topic) => topic.polls)
  @JoinTable({
    name: "poll_has_topic",
    joinColumns: [{ name: "poll_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  topics: Topic[];

  @OneToMany(
    () => PollResultPerFraction,
    (pollResultPerFraction) => pollResultPerFraction.poll,
  )
  pollResultPerFractions: PollResultPerFraction[];

  @OneToMany(() => VoteResult, (voteResult) => voteResult.poll)
  voteResults: VoteResult[];
}
