import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Party } from "./Party";
import { PoliticianWeblink } from "./PoliticianWeblink";
import { Position } from "./Position";

@Index("politician_pkey", ["id"], { unique: true })
@Index("trgm_idx_politician_label", ["label"], {})
@Entity("politician", { schema: "public" })
export class Politician {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "entity_type", nullable: true })
  entityType: string | null;

  @Column("character varying", { name: "label", nullable: true })
  label: string | null;

  @Column("character varying", { name: "api_url", nullable: true })
  apiUrl: string | null;

  @Column("character varying", {
    name: "abgeordnetenwatch_url",
    nullable: true,
  })
  abgeordnetenwatchUrl: string | null;

  @Column("character varying", { name: "first_name", nullable: true })
  firstName: string | null;

  @Column("character varying", { name: "last_name", nullable: true })
  lastName: string | null;

  @Column("character varying", { name: "birth_name", nullable: true })
  birthName: string | null;

  @Column("character varying", { name: "sex", nullable: true })
  sex: string | null;

  @Column("character varying", { name: "year_of_birth", nullable: true })
  yearOfBirth: string | null;

  @Column("character varying", { name: "party_past", nullable: true })
  partyPast: string | null;

  @Column("boolean", { name: "deceased", nullable: true })
  deceased: boolean | null;

  @Column("date", { name: "deceased_date", nullable: true })
  deceasedDate: string | null;

  @Column("character varying", { name: "education", nullable: true })
  education: string | null;

  @Column("character varying", { name: "residence", nullable: true })
  residence: string | null;

  @Column("character varying", { name: "occupation", nullable: true })
  occupation: string | null;

  @Column("character varying", { name: "statistic_questions", nullable: true })
  statisticQuestions: string | null;

  @Column("character varying", {
    name: "statistic_questions_answered",
    nullable: true,
  })
  statisticQuestionsAnswered: string | null;

  @Column("character varying", { name: "qid_wikidata", nullable: true })
  qidWikidata: string | null;

  @Column("character varying", { name: "field_title", nullable: true })
  fieldTitle: string | null;

  @ManyToOne(() => Party, (party) => party.politicians)
  @JoinColumn([{ name: "party_id", referencedColumnName: "id" }])
  party: Party;

  @OneToMany(
    () => PoliticianWeblink,
    (politicianWeblink) => politicianWeblink.politician
  )
  politicianWeblinks: PoliticianWeblink[];

  @OneToMany(() => Position, (position) => position.politician)
  positions: Position[];
}
