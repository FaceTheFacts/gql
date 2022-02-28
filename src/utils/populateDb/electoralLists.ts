import _ from "lodash";
import { Connection } from "typeorm";

import { ElectoralList } from "../../entities/ElectoralList";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";

export const populateElectoralLists = async (
  connection: Connection,
): Promise<void> => {
  const electoralLists = await DataSourceUtil.loadEntities("electoral-lists");

  const formattedElectoralLists = electoralLists.map((electoralList) => ({
    ...electoralList,
    parliament_period: electoralList.parliament_period.id,
  }));

  await connection
    .createQueryBuilder()
    .insert()
    .into(ElectoralList)
    .values(toCamelCase(formattedElectoralLists))
    .execute();
};
