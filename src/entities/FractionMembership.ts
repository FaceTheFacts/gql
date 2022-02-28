import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Fraction } from "./Fraction";

@Entity()
export class FractionMembership {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("date", { nullable: true })
  public validFrom: Date;

  @Column("date", { nullable: true })
  public validUntil: Date;

  @ManyToOne(() => Fraction, (fraction) => fraction.fractionMemberships)
  public fraction: Fraction;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.fractionMemberships,
  )
  public candidacyMandate: CandidacyMandate;
}
