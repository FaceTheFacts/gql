import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Fraction } from "./Fraction";

@Entity()
export class FractionMembership extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar", { nullable: true })
  public validFrom?: string;

  @Column("varchar", { nullable: true })
  public validUntil?: string;

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.fractionMembership,
  )
  public candidacyMandates: CandidacyMandate[];

  @ManyToOne(() => Fraction, (fraction) => fraction.fractionMemberships)
  public fraction: Fraction;
}
