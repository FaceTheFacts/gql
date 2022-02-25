import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parliament {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("string")
  public labelExternalLong: string;
}
