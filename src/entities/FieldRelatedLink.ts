import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Poll } from "./Poll";

@Entity("field_related_link", { schema: "public" })
export class FieldRelatedLink {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "uri", nullable: true })
  uri: string | null;

  @Column("character varying", { name: "title", nullable: true })
  title: string | null;

  @ManyToOne(() => Poll, (poll) => poll.fieldRelatedLinks)
  @JoinColumn([{ name: "poll_id", referencedColumnName: "id" }])
  poll: Poll;
}
