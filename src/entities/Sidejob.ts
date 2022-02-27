import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import {
  TIncomeLevel,
  TSidejobCategory,
  TSidejobIncomeInterval,
} from "../types/api";
import { CandidacyMandate } from "./CandidacyMandate";
import { City } from "./City";
import { Country } from "./Country";
import { SidejobOrganization } from "./SidejobOrganization";
import { Topic } from "./Topic";

@Entity()
export class Sidejob extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column("varchar")
  public entityType: string;

  @Column("varchar")
  public label: string;

  @Column("varchar")
  public apiUrl: string;

  @Column("varchar", { nullable: true })
  public jobTitleExtra?: string;

  @Column("varchar", { nullable: true })
  public additionalInformation?: string;

  @OneToMany(
    () => CandidacyMandate,
    (candidacyMandate) => candidacyMandate.sidejob,
  )
  public mandates: CandidacyMandate[];

  @Column("varchar")
  public category: TSidejobCategory;

  @Column("varchar", { nullable: true })
  public incomeLevel?: TIncomeLevel;

  @Column("varchar", { nullable: true })
  public interval?: TSidejobIncomeInterval;

  @Column("date", { nullable: true })
  public dataChangeDate?: Date;

  @Column("integer")
  public created: number;

  @ManyToOne(
    () => SidejobOrganization,
    (sidejobOrganization) => sidejobOrganization.sidejobs,
  )
  public sidejobOrganization: SidejobOrganization;

  @ManyToOne(() => City, (city) => city.sidejobs)
  public fieldCity?: City;

  @ManyToOne(() => Country, (country) => country.sidejobs)
  public fieldCountry?: Country;

  @ManyToMany(() => Topic, (topic) => topic.sidejobs)
  public fieldTopics: Topic[];
}
