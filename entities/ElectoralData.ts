import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Constituency } from "./Constituency";
import { ElectoralList } from "./ElectoralList";

@Index("electoral_data_pkey", ["id"], { unique: true })
@Entity("electoral_data", { schema: "public" })
export class ElectoralData {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("integer", { name: "list_position", nullable: true })
  listPosition: number | null;

  @Column("double precision", {
    name: "constituency_result",
    nullable: true,
    precision: 53,
  })
  constituencyResult: number | null;

  @Column("integer", { name: "constituency_result_count", nullable: true })
  constituencyResultCount: number | null;

  @Column("character varying", { name: "mandate_won", nullable: true })
  mandateWon: string | null;

  @ManyToOne(() => Constituency, (constituency) => constituency.electoralData)
  @JoinColumn([{ name: "constituency_id", referencedColumnName: "id" }])
  constituency: Constituency;

  @ManyToOne(
    () => ElectoralList,
    (electoralList) => electoralList.electoralData
  )
  @JoinColumn([{ name: "electoral_list_id", referencedColumnName: "id" }])
  electoralList: ElectoralList;
}
