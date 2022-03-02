import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Position } from "./Position";
import { Topic } from "./Topic";

@ObjectType()
@Entity()
export class PositionStatement extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column("varchar")
  public statement: string;

  @OneToMany(() => Position, (position) => position.positionStatement)
  public positions: Position[];

  @ManyToOne(() => Topic, (topic) => topic.positionStatements)
  public topic: Topic;
}
