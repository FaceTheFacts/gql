import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { Topic } from "./Topic";
import { CommitteeMembership } from "./CommitteeMembership";
import { Poll } from "./Poll";

@Index("committee_pkey", ["id"], { unique: true })
@Entity("committee", { schema: "public" })
export class Committee {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.committees
  )
  @JoinColumn([{ name: "field_legislature_id", referencedColumnName: "id" }])
  fieldLegislature: ParliamentPeriod;

  @ManyToMany(() => Topic, (topic) => topic.committees)
  @JoinTable({
    name: "committee_has_topic",
    joinColumns: [{ name: "committee_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  topics: Topic[];

  @OneToMany(
    () => CommitteeMembership,
    (committeeMembership) => committeeMembership.committee
  )
  committeeMemberships: CommitteeMembership[];

  @OneToMany(() => Poll, (poll) => poll.fieldCommittees)
  polls: Poll[];
}
