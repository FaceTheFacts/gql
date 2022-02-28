import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("country_api_url_key", ["apiUrl"], { unique: true })
@Index("country_pkey", ["id"], { unique: true })
@Entity("country", { schema: "public" })
export class Country {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

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
}
