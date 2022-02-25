import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CareerPath } from "./CareerPath";

@Index("cv_pkey", ["id"], { unique: true })
@Entity("cv", { schema: "public" })
export class Cv {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("integer", { name: "politician_id", nullable: true })
  politicianId: number | null;

  @Column("character varying", { name: "raw_text", nullable: true })
  rawText: string | null;

  @Column("character varying", { name: "short_description", nullable: true })
  shortDescription: string | null;

  @OneToMany(() => CareerPath, (careerPath) => careerPath.cv)
  careerPaths: CareerPath[];
}
