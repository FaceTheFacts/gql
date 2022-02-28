import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { Sidejob } from "./Sidejob";
import { SidejobOrganization } from "./SidejobOrganization";

@Entity()
export class Country extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @OneToMany(() => Sidejob, (sidejob) => sidejob.fieldCountry)
  public sidejobs: Sidejob[];

  @OneToMany(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.fieldCountry,
  )
  public sidejobOrganizations: SidejobOrganization[];
}
