import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { ElectoralData } from "./ElectoralData";
import { ParliamentPeriod } from "./ParliamentPeriod";

@Entity()
export class ElectoralList extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public name: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.electoralLists,
  )
  public parliamentPeriod: ParliamentPeriod;

  @OneToMany(
    () => ElectoralData,
    (electoralData) => electoralData.electoralList,
  )
  public electoralData: ElectoralData[];
}
