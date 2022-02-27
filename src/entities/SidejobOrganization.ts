import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { City } from "./City";
import { Country } from "./Country";
import { Sidejob } from "./Sidejob";
import { Topic } from "./Topic";

@Entity()
export class SidejobOrganization extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @ManyToOne(() => City, (city) => city.sidejobOrganizations)
  public fieldCity?: City;

  @ManyToOne(() => Country, (country) => country.sidejobOrganizations)
  public fieldCountry?: Country;

  @ManyToMany(() => Topic, (topic) => topic.sidejobOrganizations)
  public fieldTopics: Topic[];

  @OneToMany(() => Sidejob, (sidejob) => sidejob.sidejobOrganization)
  public sidejobs: Sidejob[];
}
