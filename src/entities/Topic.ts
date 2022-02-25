import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Topic extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column("varchar")
  public entityType: string;

  @Field()
  @Column("varchar")
  public label: string;

  @Field()
  @Column("varchar")
  public apiUrl: string;

  @Field()
  @Column("varchar")
  public abgeordnetenwatchUrl: string;

  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public description?: string;

  @Field(() => Topic)
  @ManyToOne(() => Topic, (topic) => topic.children)
  public parent: Topic;

  @OneToMany(() => Topic, (topic) => topic.parent)
  private children: Topic[];
}
