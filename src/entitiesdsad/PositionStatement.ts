import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Position } from "./Position";
import { Topic } from "./Topic";

@Index("position_statement_pkey", ["id"], { unique: true })
@Entity("position_statement", { schema: "public" })
export class PositionStatement {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "statement", nullable: true })
  statement: string | null;

  @OneToMany(() => Position, (position) => position.positionStatement)
  positions: Position[];

  @ManyToOne(() => Topic, (topic) => topic.positionStatements)
  @JoinColumn([{ name: "topic_id", referencedColumnName: "id" }])
  topic: Topic;
}