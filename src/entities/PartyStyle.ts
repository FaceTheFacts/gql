import {
  Column,
  Entity,
  // Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Party } from "./Party";

// @Index("party_style_pkey", ["id"], { unique: true })
@Entity("party_style", { schema: "public" })
export class PartyStyle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("character varying", { name: "display_name", nullable: true })
  displayName: string | null;

  @Column("character varying", { name: "foreground_color", nullable: true })
  foregroundColor: string | null;

  @Column("character varying", { name: "background_color", nullable: true })
  backgroundColor: string | null;

  @Column("character varying", { name: "border_color", nullable: true })
  borderColor: string | null;

  @OneToMany(() => Party, (party) => party.partyStyle)
  parties: Party[];
}
