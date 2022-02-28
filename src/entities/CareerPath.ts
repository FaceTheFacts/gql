import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Cv } from "./Cv";

@Entity("career_path", { schema: "public" })
export class CareerPath {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("text", { nullable: true })
  public rawText: string;

  @Column("text", { name: "label", nullable: true })
  public label?: string;

  @Column("varchar", { name: "period", nullable: true })
  public period?: string;

  @ManyToOne(() => Cv, (cv) => cv.careerPaths)
  @JoinColumn([{ name: "cv_id", referencedColumnName: "id" }])
  public cv: Cv;
}
