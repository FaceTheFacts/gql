import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { Committee } from "./Committee";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { Topic } from "./Topic";
import { Vote } from "./Vote";

@Entity()
export class Poll extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public abgeordnetenwatchUrl: string;

  @Column("text", { nullable: true })
  public fieldIntro?: string;

  @Column("date")
  public fieldPollDate: Date;

  // TODO:
  // fieldRelatedLinks: TLink[];

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.polls,
  )
  public fieldLegislature: ParliamentPeriod;

  @ManyToOne(() => Committee, (committee) => committee.polls)
  public fieldCommittees?: Committee;

  @ManyToMany(() => Topic, (topic) => topic.polls)
  @JoinTable()
  public fieldTopics: Topic[];

  @OneToMany(() => Vote, (vote) => vote.poll)
  public votes: Vote[];
}
