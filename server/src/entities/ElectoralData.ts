import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Constituency } from "./Constituency";
import { ElectoralList } from "./ElectoralList";

@Entity()
export class ElectoralData extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("integer", { nullable: true })
  public listPosition?: number;

  @Column("float", { nullable: true })
  public constituencyResult?: number;

  @Column("integer", { nullable: true })
  public constituencyResultCount?: number;

  @Column("character varying", { nullable: true })
  public mandateWon?: string;

  @ManyToOne(() => Constituency, (constituency) => constituency.electoralData)
  public constituency: Constituency;

  @ManyToOne(
    () => ElectoralList,
    (electoralList) => electoralList.electoralData,
  )
  public electoralList: ElectoralList;
}
