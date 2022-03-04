import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Country {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;
}
