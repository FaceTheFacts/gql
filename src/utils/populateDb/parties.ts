import _ from "lodash";
import { Connection } from "typeorm";

import { Party } from "../../entities/Party";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";

export const populateParties = async (
  connection: Connection,
): Promise<void> => {
  const parties = await DataSourceUtil.loadEntities("parties");

  await connection
    .createQueryBuilder()
    .insert()
    .into(Party)
    .values(toCamelCase(parties))
    .execute();
};
