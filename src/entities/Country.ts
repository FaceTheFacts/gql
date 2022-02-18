import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("country_api_url_key", ["apiUrl"], { unique: true })
@Index("country_pkey", ["id"], { unique: true })
@Entity("country", { schema: "public" })
export class Country {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("varchar", { name: "entity_type" })
  public entityType: string | null;

  @Column("varchar", { name: "label", unique: true })
  public label: string;

  @Column("varchar", {
    name: "api_url",
    unique: true,
  })
  public apiUrl: string;
}
