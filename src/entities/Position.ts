import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ParliamentPeriod } from "./ParliamentPeriod";
import { Politician } from "./Politician";
import { PositionStatement } from "./PositionStatement";

@ObjectType()
@Entity("position", { schema: "public" })
export class Position extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  public id: string;

  @Field()
  @Column("varchar")
  public position: string;

  // TODO: Fix
  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public reason?: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.positions,
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  public parliamentPeriod: ParliamentPeriod;

  @ManyToOne(() => Politician, (politician) => politician.positions)
  @JoinColumn([{ name: "politician_id", referencedColumnName: "id" }])
  politician: Politician;

  @ManyToOne(
    () => PositionStatement,
    (positionStatement) => positionStatement.positions,
  )
  @JoinColumn([{ name: "position_statement_id", referencedColumnName: "id" }])
  positionStatement: PositionStatement;
}
