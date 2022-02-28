import _ from "lodash";
import { Connection } from "typeorm";

import { Parliament } from "../../entities/Parliament";
import { ParliamentPeriod } from "../../entities/ParliamentPeriod";
import { toCamelCase } from "../../lib/toCamelCase";
import { DataSourceUtil } from "../classes/DataSourceUtil";

export const populateParliamentsAndParliamentPeriods = async (
  connection: Connection,
): Promise<void> => {
  const [parliaments, parliamentPeriods] = await Promise.all([
    DataSourceUtil.loadEntities("parliaments"),
    DataSourceUtil.loadEntities("parliament-periods"),
  ]);

  const formattedParliaments = parliaments.map((parliament) =>
    _.omit(parliament, "current_project"),
  );

  await connection
    .createQueryBuilder()
    .insert()
    .into(Parliament)
    .values(toCamelCase(formattedParliaments))
    .execute();

  const formattedParliamentPeriods = parliamentPeriods.map((period) => {
    if (period.previous_period) {
      return {
        ...period,
        parliament: period.parliament.id,
        previous_period: period.previous_period.id,
      };
    }

    return {
      ...period,
      parliament: period.parliament.id,
    };
  });

  await connection
    .createQueryBuilder()
    .insert()
    .into(ParliamentPeriod)
    .values(toCamelCase(formattedParliamentPeriods))
    .execute();

  const parliamentsWithProject = parliaments.map((parliament) => ({
    ...parliament,
    current_project: parliament.current_project.id,
  }));

  await connection
    .createQueryBuilder()
    .insert()
    .into(Parliament)
    .values(toCamelCase(parliamentsWithProject))
    .orUpdate({ conflict_target: ["id"], overwrite: ["current_project_id"] })
    .execute();
};
