import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { City } from "./City";
import { SidejobOrganization } from "./SidejobOrganization";
import { CandidacyMandate } from "./CandidacyMandate";
import { Topic } from "./Topic";

@Index("sidejob_pkey", ["id"], { unique: true })
@Entity("sidejob", { schema: "public" })
export class Sidejob {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", { name: "job_title_extra", nullable: true })
  jobTitleExtra: string | null;

  @Column("character varying", {
    name: "additional_information",
    nullable: true,
  })
  additionalInformation: string | null;

  @Column("character varying", { name: "category", nullable: true })
  category: string | null;

  @Column("character varying", { name: "income_level", nullable: true })
  incomeLevel: string | null;

  @Column("character varying", { name: "interval", nullable: true })
  interval: string | null;

  @Column("date", { name: "data_change_date", nullable: true })
  dataChangeDate: string | null;

  @Column("integer", { name: "created", nullable: true })
  created: number | null;

  @Column("integer", { name: "field_country_id", nullable: true })
  fieldCountryId: number | null;

  @ManyToOne(() => City, (city) => city.sidejobs)
  @JoinColumn([{ name: "field_city_id", referencedColumnName: "id" }])
  fieldCity: City;

  @ManyToOne(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.sidejobs
  )
  @JoinColumn([{ name: "sidejob_organization_id", referencedColumnName: "id" }])
  sidejobOrganization: SidejobOrganization;

  @ManyToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.sidejobs
  )
  candidacyMandates: CandidacyMandate[];

  @ManyToMany(() => Topic, (topic) => topic.sidejobs)
  @JoinTable({
    name: "sidejob_has_topic",
    joinColumns: [{ name: "sidejob_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "topic_id", referencedColumnName: "id" }],
    schema: "public",
  })
  topics: Topic[];
}
