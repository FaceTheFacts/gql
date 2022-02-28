import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectoralData } from "./ElectoralData";
import { ZipCode } from "./ZipCode";

@Index("constituency_pkey", ["id"], { unique: true })
@Entity("constituency", { schema: "public" })
export class Constituency {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

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
