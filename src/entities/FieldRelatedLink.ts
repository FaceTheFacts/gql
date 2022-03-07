import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

import { Poll } from "./Poll";

@Entity()
export class FieldRelatedLink extends BaseEntity {
  @PrimaryColumn()
  public id: number;

  @Column("varchar")
  public uri: string;

  @Column("varchar")
  public title: string;

  @ManyToOne(() => Poll, (poll) => poll.fieldRelatedLinks)
  public poll: Poll;
}
