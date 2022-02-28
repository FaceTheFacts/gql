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

@Entity("sidejob_organization", { schema: "public" })
export class SidejobOrganization {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("integer", { name: "field_country_id", nullable: true })
  fieldCountryId: number | null;

  @OneToMany(() => Sidejob, (sidejob) => sidejob.sidejobOrganization)
  sidejobs: Sidejob[];

  @ManyToOne(() => City, (city) => city.sidejobOrganizations)
  @JoinColumn([{ name: "field_city_id", referencedColumnName: "id" }])
  fieldCity: City;

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
