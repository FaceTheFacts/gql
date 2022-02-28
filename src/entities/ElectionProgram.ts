import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { ParliamentPeriod } from "./ParliamentPeriod";

@Entity("election_program", { schema: "public" })
export class ElectionProgram {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("integer", { name: "party_id", nullable: true })
  partyId: number | null;

  @Column("character varying", { name: "link_uri", nullable: true })
  linkUri: string | null;

  @Column("character varying", { name: "link_title", nullable: true })
  linkTitle: string | null;

  @Column("character varying", { name: "link_option", nullable: true })
  linkOption: string | null;

  @Column("character varying", { name: "file", nullable: true })
  file: string | null;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.electionPrograms,
  )
  @JoinColumn([{ name: "parliament_period_id", referencedColumnName: "id" }])
  parliamentPeriod: ParliamentPeriod;
}
