import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { Fraction } from "./Fraction";

@Entity("fraction_membership", { schema: "public" })
export class FractionMembership {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "valid_from", nullable: true })
  validFrom: string | null;

  @Column("character varying", { name: "valid_until", nullable: true })
  validUntil: string | null;

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.fractionMembership,
  )
  candidacyMandates: CandidacyMandate[];

  @ManyToOne(() => Fraction, (fraction) => fraction.fractionMemberships)
  @JoinColumn([{ name: "fraction_id", referencedColumnName: "id" }])
  fraction: Fraction;
}
