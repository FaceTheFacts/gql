import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ElectoralData } from "./ElectoralData";
import { ParliamentPeriod } from "./ParliamentPeriod";

@Entity("electoral_list", { schema: "public" })
export class ElectoralList {
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

  @OneToMany(
    () => ElectoralData,
    (electoralData) => electoralData.electoralList,
  )
  electoralData: ElectoralData[];

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.electoralLists,
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  parliamentPeriod: ParliamentPeriod;
}
