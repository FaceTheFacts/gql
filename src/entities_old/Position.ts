import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { Politician } from "./Politician";
import { PositionStatement } from "./PositionStatement";

@Index("position_pkey", ["id"], { unique: true })
@Entity("position", { schema: "public" })
export class Position {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: string;

  @Column("character varying", { name: "position", nullable: true })
  position: string | null;

  @Column("character varying", { name: "reason", nullable: true })
  reason: string | null;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.positions
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  parliamentPeriod: ParliamentPeriod;

  @ManyToOne(() => Politician, (politician) => politician.positions)
  @JoinColumn([{ name: "politician_id", referencedColumnName: "id" }])
  politician: Politician;

  @ManyToOne(
    () => PositionStatement,
    (positionStatement) => positionStatement.positions
  )
  @JoinColumn([{ name: "position_statement_id", referencedColumnName: "id" }])
  positionStatement: PositionStatement;
}
