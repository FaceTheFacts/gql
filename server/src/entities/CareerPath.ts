import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Cv } from "./Cv";

@Entity()
export class CareerPath {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("text", { nullable: true })
  public rawText?: string;

  @Column("text", { nullable: true })
  public label?: string;

  @Column("varchar", { nullable: true })
  public period?: string;

  @ManyToOne(() => Cv, (cv) => cv.careerPaths)
  public cv: Cv;
}
