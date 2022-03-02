import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CareerPath } from "./CareerPath";

@Entity("cv", { schema: "public" })
export class Cv extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("integer", { name: "politician_id", nullable: true })
  politicianId: number | null;

  @Column("character varying", { name: "raw_text", nullable: true })
  rawText: string | null;

  @Column("character varying", { name: "short_description", nullable: true })
  shortDescription: string | null;

  @OneToMany(() => CareerPath, (careerPath) => careerPath.cv)
  careerPaths: CareerPath[];
}
