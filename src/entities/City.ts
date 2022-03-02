import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { Sidejob } from "./Sidejob";
import { SidejobOrganization } from "./SidejobOrganization";

@Entity()
export class City extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar", {
    unique: true,
  })
  public apiUrl: string;

  @OneToMany(() => Sidejob, (sidejob) => sidejob.fieldCity)
  public sidejobs: Sidejob[];

  @OneToMany(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.fieldCity,
  )
  public sidejobOrganizations: SidejobOrganization[];
}
