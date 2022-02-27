import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { FractionMembership } from "./FractionMembership";
import { ParliamentPeriod } from "./ParliamentPeriod";

@Entity()
export class Fraction extends BaseEntity {
  @PrimaryGeneratedColumn()
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
}
