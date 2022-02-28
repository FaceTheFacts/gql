import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { Party } from "./Party";

@ObjectType()
@Entity()
export class PartyStyle extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  public id: number;

  @Field()
  @Column("varchar")
  public displayName: string;

  @Field()
  @Column("varchar")
  public foregroundColor: string;

  @Field()
  @Column("varchar")
  public backgroundColor: string;

  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public borderColor?: string;

  @OneToMany(() => Party, (party) => party.partyStyle)
  parties: Party[];
}
