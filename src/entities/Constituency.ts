import {
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ElectoralData } from "./ElectoralData";
import { ParliamentPeriod } from "./ParliamentPeriod";

export class Constituency extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public name: string;

  @Column("varchar", { nullable: true })
  public number?: number;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.constituencies,
  )
  public parliamentPeriod: ParliamentPeriod;

  @OneToMany(() => ElectoralData, (electoralData) => electoralData.constituency)
  public electoralData: ElectoralData[];
}
