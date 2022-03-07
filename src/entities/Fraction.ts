import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { FractionMembership } from "./FractionMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";
import { PollResultPerFraction } from "./PollResultPerFraction";
import { Vote } from "./Vote";

@Entity()
export class Fraction extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public fullName: string;

  @Column("varchar")
  public shortName: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.fractions,
  )
  public legislature: ParliamentPeriod;

  @OneToMany(
    () => FractionMembership,
    (fractionMembership) => fractionMembership.fraction,
  )
  public fractionMemberships: FractionMembership[];

  @OneToMany(
    () => PollResultPerFraction,
    (pollResultPerFraction) => pollResultPerFraction.fraction,
  )
  public pollResultPerFractions: PollResultPerFraction[];

  @OneToMany(() => Vote, (vote) => vote.fraction)
  public votes: Vote[];
}
