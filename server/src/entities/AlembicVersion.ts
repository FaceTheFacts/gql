import { Column, Entity } from "typeorm";

@Entity("alembic_version", { schema: "public" })
export class AlembicVersion {
  @Column("character varying", {
    primary: true,
    name: "version_num",
    length: 32,
  })
  versionNum: string;
}
