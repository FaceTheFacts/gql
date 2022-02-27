import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ParliamentPeriod } from "./ParliamentPeriod";
import { Topic } from "./Topic";

@ObjectType()
@Entity()
export class Committee extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.committees,
  )
  public fieldLegislature: ParliamentPeriod;

  @Field(() => [Topic])
  @ManyToMany(() => Topic, (topic) => topic.committees)
  public fieldTopics: Topic[];
}
