import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Committee } from "./Committee";
import { Poll } from "./Poll";
import { Sidejob } from "./Sidejob";
import { SidejobOrganization } from "./SidejobOrganization";

@ObjectType()
@Entity()
export class Topic extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
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

  @ManyToMany(() => Committee, (committee) => committee.fieldTopics)
  public committees: Committee[];

  @ManyToMany(() => Sidejob, (sidejob) => sidejob.fieldTopics)
  public sidejobs: Sidejob[];

  @ManyToMany(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.fieldTopics,
  )
  public sidejobOrganizations: SidejobOrganization[];

  @ManyToMany(() => Poll, (poll) => poll.fieldTopics)
  public polls: Poll[];
}
