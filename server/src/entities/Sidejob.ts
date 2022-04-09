import { Field, ID, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CandidacyMandate } from "./CandidacyMandate";
import { City } from "./City";
import { SidejobOrganization } from "./SidejobOrganization";
import { Topic } from "./Topic";

@ObjectType()
@Entity()
export class Sidejob extends BaseEntity {
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

  @Column("varchar", { nullable: true })
  public jobTitleExtra?: string;

  @Column("varchar", { nullable: true })
  public additionalInformation?: string;

  @Column("varchar")
  public category: string;

  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public incomeLevel?: string;

  @Field({ nullable: true })
  @Column("varchar", { nullable: true })
  public interval?: string;

  @Column("date", { nullable: true })
  public dataChangeDate?: string;

  @Field(() => Int)
  @Column("integer")
  public created: number;

  @Column("integer", { nullable: true })
  public fieldCountryId?: number;

  @ManyToOne(() => City, (city) => city.sidejobs)
  public fieldCity: City;

  @Field(() => SidejobOrganization, { nullable: true })
  @ManyToOne(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.sidejobs,
  )
  public sidejobOrganization: SidejobOrganization;

  @ManyToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.sidejobs,
  )
  public candidacyMandates: CandidacyMandate[];

  @ManyToMany(() => Topic, (topic) => topic.sidejobs)
  @JoinTable({
    name: "sidejob_has_topic",
    joinColumns: [{ name: "sidejob_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  public topics: Topic[];
}
