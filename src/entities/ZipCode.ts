import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Constituency } from "./Constituency";

@Entity("zip_code", { schema: "public" })
export class ZipCode {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "zip_code", nullable: true })
  zipCode: string | null;

  @ManyToOne(() => Constituency, (constituency) => constituency.zipCodes)
  @JoinColumn([{ name: "constituency_id", referencedColumnName: "id" }])
  constituency: Constituency;
}
