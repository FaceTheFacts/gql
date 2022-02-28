import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { MandateWonEnum } from "../enums/entities";
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

  @Column("integer", { nullable: true })
  public constituencyResult?: number;

  @Column("float", { nullable: true })
  public constituencyResultCount?: number;

  @Column({
    type: "enum",
    enum: MandateWonEnum,
  })
  public mandateWon: MandateWonEnum;

  @ManyToOne(
    () => ElectoralList,
    (electoralList) => electoralList.electoralData,
  )
  public electoralList: ElectoralList;

  @ManyToOne(() => Constituency, (constituency) => constituency.electoralData)
  public constituency: Constituency;
}
