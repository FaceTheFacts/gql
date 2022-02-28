import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Cv } from "./Cv";

@Index("career_path_pkey", ["id"], { unique: true })
@Entity("career_path", { schema: "public" })
export class CareerPath {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("character varying", { name: "raw_text", nullable: true })
  public rawText?: string;

  @Column("varchar", { name: "label" })
  public label: string;

  @Column("character varying", { name: "period", nullable: true })
  public period?: string;

  @ManyToOne(() => Cv, (cv) => cv.careerPaths)
  @JoinColumn([{ name: "cv_id", referencedColumnName: "id" }])
  public cv: Cv;
}
