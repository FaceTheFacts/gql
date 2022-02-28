import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("vote", { schema: "public" })
export class Vote {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("integer", { name: "mandate_id", nullable: true })
  mandateId: number | null;

  @Column("integer", { name: "fraction_id", nullable: true })
  fractionId: number | null;

  @Column("integer", { name: "poll_id", nullable: true })
  pollId: number | null;

  @Column("character varying", { name: "vote", nullable: true })
  vote: string | null;

  @Column("character varying", { name: "reason_no_show", nullable: true })
  reasonNoShow: string | null;

  @Column("character varying", { name: "reason_no_show_other", nullable: true })
  reasonNoShowOther: string | null;
}
