import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CareerPath } from "./CareerPath";
import { Politician } from "./Politician";

@ObjectType()
@Entity()
export class Cv extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("integer")
  public politicianId: number;

  @OneToOne(() => Politician)
  @JoinColumn()
  public politician: Politician;

  @Field()
  @Column("varchar", { nullable: true })
  public rawText?: string;

  @Field()
  @Column("varchar")
  public shortDescription: string;

  @OneToMany(() => CareerPath, (careerPath) => careerPath.cv)
  public careerPaths: CareerPath[];
}
