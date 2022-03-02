import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
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
  public parliamentPeriod: ParliamentPeriod;

  @ManyToOne(() => Politician, (politician) => politician.positions)
  public politician: Politician;

  @Field(() => PositionStatement)
  @ManyToOne(
    () => PositionStatement,
    (positionStatement) => positionStatement.positions,
  )
  public positionStatement: PositionStatement;
}
