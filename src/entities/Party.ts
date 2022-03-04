import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { PartyStyle } from "./PartyStyle";
import { Politician } from "./Politician";

@ObjectType()
@Entity()
export class Party extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Field()
  @Column("varchar")
  public label: string;

  @Field()
  @Column("varchar")
  public apiUrl: string;

  @Field()
  @Column("varchar")
  public fullName: string;

  @Field()
  @Column("varchar")
  public shortName: string;

  @Field(() => PartyStyle)
  @ManyToOne(() => PartyStyle, (partyStyle) => partyStyle.parties)
  public style: PartyStyle;

  @OneToMany(() => Politician, (politician) => politician.party)
  public politicians: Politician[];

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.party,
  )
  public candidacyMandates: CandidacyMandate[];
}
