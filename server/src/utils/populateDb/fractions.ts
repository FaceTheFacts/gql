import _ from "lodash";
import { Connection } from "typeorm";

import { Fraction } from "../../entities/Fraction";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";

export const populateFractions = async (
  connection: Connection,
): Promise<void> => {
  const fractions = await DataSourceUtil.loadEntities("fractions");
  const formattedFractions = fractions.map((fraction) => ({
    ...fraction,
    legislature: fraction.legislature.id,
  }));

  await connection
    .createQueryBuilder()
    .insert()
    .into(Fraction)
    .values(toCamelCase(formattedFractions))
    .execute();
};
