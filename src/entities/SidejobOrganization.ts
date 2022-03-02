import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { City } from "./City";
import { Sidejob } from "./Sidejob";
import { Topic } from "./Topic";

@ObjectType()
@Entity("sidejob_organization", { schema: "public" })
export class SidejobOrganization {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
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

  @Column("integer", { nullable: true })
  public fieldCountryId?: number;

  @OneToMany(() => Sidejob, (sidejob) => sidejob.sidejobOrganization)
  public sidejobs: Sidejob[];

  @ManyToOne(() => City, (city) => city.sidejobOrganizations)
  @JoinColumn([{ name: "field_city_id", referencedColumnName: "id" }])
  public fieldCity: City;

  @ManyToMany(() => Topic, (topic) => topic.sidejobOrganizations)
  @JoinTable({
    name: "sidejob_organization_has_topic",
    joinColumns: [
      { name: "sidejob_organization_id", referencedColumnName: "id" },
    ],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  topics: Topic[];
}
