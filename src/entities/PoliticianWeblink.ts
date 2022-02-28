import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Politician } from "./Politician";

@Entity("politician_weblink", { schema: "public" })
export class PoliticianWeblink {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "link", nullable: true })
  link: string | null;

  @ManyToOne(() => Politician, (politician) => politician.politicianWeblinks)
  @JoinColumn([{ name: "politician_id", referencedColumnName: "id" }])
  politician: Politician;
}
