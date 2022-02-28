import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Committee } from "./Committee";
import { Poll } from "./Poll";
import { PositionStatement } from "./PositionStatement";
import { Sidejob } from "./Sidejob";
import { SidejobOrganization } from "./SidejobOrganization";

@Entity("topic", { schema: "public" })
export class Topic {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", {
    name: "abgeordnetenwatch_url",
    nullable: true,
  })
  abgeordnetenwatchUrl: string | null;

  @Column("character varying", { name: "description", nullable: true })
  description: string | null;

  @ManyToMany(() => Committee, (committee) => committee.topics)
  committees: Committee[];

  @ManyToMany(() => Poll, (poll) => poll.topics)
  polls: Poll[];

  @OneToMany(
    () => PositionStatement,
    (positionStatement) => positionStatement.topic,
  )
  positionStatements: PositionStatement[];

  @ManyToMany(() => Sidejob, (sidejob) => sidejob.topics)
  sidejobs: Sidejob[];

  @ManyToMany(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.topics,
  )
  sidejobOrganizations: SidejobOrganization[];

  @ManyToOne(() => Topic, (topic) => topic.topics)
  @JoinColumn([{ name: "parent_id", referencedColumnName: "id" }])
  parent: Topic;

  @OneToMany(() => Topic, (topic) => topic.parent)
  topics: Topic[];
}
