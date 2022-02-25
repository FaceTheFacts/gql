import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { PartyStyle } from "./PartyStyle";
import { Politician } from "./Politician";

@Index("party_api_url_key", ["apiUrl"], { unique: true })
@Index("party_pkey", ["id"], { unique: true })
@Entity("party", { schema: "public" })
export class Party {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", {
    name: "api_url",
    nullable: true,
    unique: true,
  })
  apiUrl: string | null;

  @Column("character varying", { name: "full_name", nullable: true })
  fullName: string | null;

  @Column("character varying", { name: "short_name", nullable: true })
  shortName: string | null;

  @ManyToOne(() => PartyStyle, (partyStyle) => partyStyle.parties)
  @JoinColumn([{ name: "party_style_id", referencedColumnName: "id" }])
  partyStyle: PartyStyle;

  @OneToMany(() => Politician, (politician) => politician.party)
  politicians: Politician[];
}
