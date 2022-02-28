import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Sidejob } from "./Sidejob";
import { SidejobOrganization } from "./SidejobOrganization";

@Index("city_api_url_key", ["apiUrl"], { unique: true })
@Index("city_pkey", ["id"], { unique: true })
@Entity("city", { schema: "public" })
export class City {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public static id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", {
    name: "api_url",
    nullable: true,
    unique: true,
  })
  apiUrl: string | null;

  @OneToMany(() => Sidejob, (sidejob) => sidejob.fieldCity)
  sidejobs: Sidejob[];

  @OneToMany(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.fieldCity
  )
  sidejobOrganizations: SidejobOrganization[];
}
