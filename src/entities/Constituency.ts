import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ElectoralData } from "./ElectoralData";
import { ZipCode } from "./ZipCode";

@Entity("constituency", { schema: "public" })
export class Constituency extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("varchar", { name: "entity_type" })
  public entityType: string | null;

  @Column("text", { name: "label", nullable: true })
  public label?: string;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

  @Column("integer", { name: "number", nullable: true })
  number: number | null;

  @Column("integer", { name: "parliament_period_id", nullable: true })
  parliamentPeriodId: number | null;

  @OneToMany(() => ElectoralData, (electoralData) => electoralData.constituency)
  electoralData: ElectoralData[];

  @OneToMany(() => ZipCode, (zipCode) => zipCode.constituency)
  zipCodes: ZipCode[];
}
