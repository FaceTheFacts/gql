import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { FractionMembership } from "./FractionMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { PollResultPerFraction } from "./PollResultPerFraction";
import { Vote } from "./Vote";

@Entity("fraction", { schema: "public" })
export class Fraction extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", { name: "full_name", nullable: true })
  fullName: string | null;

  @Column("character varying", { name: "short_name", nullable: true })
  shortName: string | null;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.fractions,
  )
  @JoinColumn([{ name: "legislature_id", referencedColumnName: "id" }])
  legislature: ParliamentPeriod;

  @OneToMany(
    () => FractionMembership,
    (fractionMembership) => fractionMembership.fraction,
  )
  fractionMemberships: FractionMembership[];

  @OneToMany(
    () => PollResultPerFraction,
    (pollResultPerFraction) => pollResultPerFraction.fraction,
  )
  pollResultPerFractions: PollResultPerFraction[];

  @OneToMany(() => Vote, (vote) => vote.fraction)
  public votes: Vote[];
}
