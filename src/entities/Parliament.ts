import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ParliamentPeriod } from "./ParliamentPeriod";

@Entity()
export class Parliament extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("string")
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
