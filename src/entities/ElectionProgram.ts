import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { ParliamentPeriod } from "./ParliamentPeriod";
import { Party } from "./Party";

@Entity()
export class ElectionProgram extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar")
  public file: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.electionPrograms,
  )
  public parliamentPeriod: ParliamentPeriod;

  @ManyToOne(() => Party, (party) => party.electionPrograms)
  public party: Party;

  // TODO: link
  // link: TLink[];
}
