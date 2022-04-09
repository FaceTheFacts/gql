import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Politician } from "./Politician";

@ObjectType()
@Entity()
export class PoliticianWeblink extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn({ type: "integer", name: "id" })
  id: number;

  @Field(() => ID)
  @Column("varchar")
  public link: string;

  @ManyToOne(() => Politician, (politician) => politician.politicianWeblinks)
  public politician: Politician;
}
