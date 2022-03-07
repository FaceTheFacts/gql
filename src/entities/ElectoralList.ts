import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
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

  @OneToMany(
    () => ElectoralData,
    (electoralData) => electoralData.electoralList,
  )
  public electoralData: ElectoralData[];

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.electoralLists,
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  public parliamentPeriod: ParliamentPeriod;
}
