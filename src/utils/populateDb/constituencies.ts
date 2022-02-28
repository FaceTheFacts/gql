import _ from "lodash";
import { Connection } from "typeorm";

import { Constituency } from "../../entities/Constituency";
import { chunkArr } from "../../lib/chunkArr";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";
import { JsonUtil } from "../classes/JsonUtil";

type TConstituencyParliamentPeriodIdMap = Record<string, number>;

export const populateConstituencies = async (
  connection: Connection,
): Promise<void> => {
  const constituencies = await DataSourceUtil.loadEntities("constituencies");

  const constituencyParliamentPeriodIdMap =
    JsonUtil.readJsonSync<TConstituencyParliamentPeriodIdMap>(
      "./src/statics/constituency_id_parliament_period_id.json",
    );

  const formattedConstituencies = constituencies.map((constituency) => ({
    ...constituency,
    parliament_period: constituencyParliamentPeriodIdMap[constituency.id],
  }));

  for (const chunk of chunkArr(formattedConstituencies, 1000)) {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Constituency)
      .values(toCamelCase(chunk))
      .execute();
  }
};
