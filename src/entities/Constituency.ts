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
import { ZipCode } from "./ZipCode";

@Entity()
export class Constituency extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("text", { nullable: true })
  public label?: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public name: string;

  @Column("integer", { nullable: true })
  public number?: number;

  @Column("integer")
  public parliamentPeriodId: number;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.constituencies,
  )
  public parliamentPeriod: ParliamentPeriod;

  @OneToMany(() => ElectoralData, (electoralData) => electoralData.constituency)
  public electoralData: ElectoralData[];

  @OneToMany(() => ZipCode, (zipCode) => zipCode.constituency)
  public zipCodes: ZipCode[];
}
