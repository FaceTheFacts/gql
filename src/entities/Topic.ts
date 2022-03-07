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
import { PositionStatement } from "./PositionStatement";
import { Sidejob } from "./Sidejob";
import { SidejobOrganization } from "./SidejobOrganization";

@Entity()
export class Topic extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public abgeordnetenwatchUrl: string | null;

  @Column("varchar", { nullable: true })
  public description?: string;

  @ManyToMany(() => Committee, (committee) => committee.topics)
  public committees: Committee[];

  @ManyToMany(() => Poll, (poll) => poll.topics)
  public polls: Poll[];

  @OneToMany(
    () => PositionStatement,
    (positionStatement) => positionStatement.topic,
  )
  public positionStatements: PositionStatement[];

  @ManyToMany(() => Sidejob, (sidejob) => sidejob.topics)
  public sidejobs: Sidejob[];

  @ManyToMany(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.topics,
  )
  public sidejobOrganizations: SidejobOrganization[];

  @ManyToOne(() => Topic, (topic) => topic.topics)
  public parent: Topic;

  @OneToMany(() => Topic, (topic) => topic.parent)
  public topics: Topic[];
}
