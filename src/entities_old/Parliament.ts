import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ParliamentPeriod } from "./ParliamentPeriod";

@Index("parliament_pkey", ["id"], { unique: true })
@Entity("parliament", { schema: "public" })
export class Parliament {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", {
    name: "abgeordnetenwatch_url",
    nullable: true,
  })
  abgeordnetenwatchUrl: string | null;

  @Column("character varying", { name: "label_external_long", nullable: true })
  labelExternalLong: string | null;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliaments
  )
  @JoinColumn([{ name: "current_project_id", referencedColumnName: "id" }])
  currentProject: ParliamentPeriod;

  @OneToMany(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.parliament
  )
  parliamentPeriods: ParliamentPeriod[];
}
