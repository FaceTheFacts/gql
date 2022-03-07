import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { ParliamentPeriod } from "./ParliamentPeriod";

@Entity()
export class Parliament extends BaseEntity {
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

  @Column("varchar")
  public labelExternalLong: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliaments,
  )
  public currentProject: ParliamentPeriod;

  @OneToMany(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliament,
  )
  public parliamentPeriods: ParliamentPeriod[];
}
