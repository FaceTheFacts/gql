import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import type { TReasonNoShow, TVote } from "../types/api";
import { CandidacyMandate } from "./CandidacyMandate";
import { Fraction } from "./Fraction";
import { Poll } from "./Poll";

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  public id: number;

  @Field()
  @Column("varchar")
  public entityType: string;

  @Field()
  @Column("varchar")
  public label: string;

  @Field()
  @Column("varchar")
  public apiUrl: string;

  @Column("integer")
  public mandateId: number;

  @Column("integer", { nullable: true })
  public fractionId?: number;

  @Column("integer")
  public pollId: number;

  @Field()
  @Column("varchar")
  public vote: TVote;

  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public reasonNoShow?: TReasonNoShow;

  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public reasonNoShowOther?: string;

  @ManyToOne(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.votes,
  )
  public mandate: CandidacyMandate;

  @ManyToOne(() => Fraction, (fraction) => fraction.votes)
  public fraction: Fraction;

  @Field(() => Poll)
  @ManyToOne(() => Poll, (poll) => poll.votes)
  public poll: Poll;
}
