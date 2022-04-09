import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Constituency } from "./Constituency";

@Entity()
export class ZipCode extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public zipCode: string;

  @ManyToOne(() => Constituency, (constituency) => constituency.zipCodes)
  public constituency: Constituency;
}
