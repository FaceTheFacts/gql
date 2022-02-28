import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
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

  @Column("text")
  public labelExternalLong: string;

  @OneToOne(() => ParliamentPeriod)
  @JoinColumn()
  public currentProject: ParliamentPeriod;

  @OneToMany(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliament,
  )
  public parliamentPeriods: ParliamentPeriod[];
}