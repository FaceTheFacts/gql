import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Politician } from "./Politician";

@Index("politician_weblink_pkey", ["id"], { unique: true })
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
