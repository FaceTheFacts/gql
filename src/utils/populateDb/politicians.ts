import _ from "lodash";
import { Connection } from "typeorm";

import { Politician } from "../../entities/Politician";
import { chunkArr } from "../../lib/chunkArr";
import { toCamelCase } from "../../lib/toCamelCase";
import { TPoliticianSex } from "../../types/api";
import { DataSourceUtil } from "../classes/DataSourceUtil";

const PoliticianSex: Record<TPoliticianSex | "male ", TPoliticianSex> = {
  m: "m",
  f: "f",
  d: "d",
  "male ": "m",
};

export const populatePoliticians = async (
  connection: Connection,
): Promise<void> => {
  const politicians = await DataSourceUtil.loadEntities("politicians");

  const formattedPoliticians = politicians.map((politician) => {
    if (politician.party) {
      return {
        ...politician,
        party: politician.party.id,
        ...(politician.sex && {
          sex: PoliticianSex[politician.sex],
        }),
      };
    }

    return {
      ...politician,
      ...(politician.sex && {
        sex: PoliticianSex[politician.sex],
      }),
    };
  });

  for (const chunk of chunkArr(formattedPoliticians, 1000)) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Politician)
      .values(toCamelCase(chunk))
      .execute();
  }
};
