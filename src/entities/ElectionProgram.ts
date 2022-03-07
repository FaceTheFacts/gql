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

  @Column("integer", { nullable: true })
  public partyId?: number;

  @ManyToOne(() => Party, (party) => party.electionPrograms)
  public party: Party;

  @Column("varchar", { nullable: true })
  public linkUri?: string;

  @Column("varchar", { nullable: true })
  public linkTitle?: string;

  @Column("varchar", { nullable: true })
  public linkOption?: string;

  @Column("varchar", { nullable: true })
  public file?: string;

  @ManyToOne(
    () => ParliamentPeriod,
    (parliamentPeriod) => parliamentPeriod.electionPrograms,
  )
  public parliamentPeriod: ParliamentPeriod;
}
