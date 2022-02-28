import _ from "lodash";
import { Connection } from "typeorm";

// import { Party } from "../../entities/Party";
import { Politician } from "../../entities/Politician";
import { prepareConnection } from "../../lib/prepareConnection";
import { DataSourceUtil } from "../classes/DataSourceUtil";

type TObject = Record<string, any>;

const toCamelCase = (obj: TObject): TObject =>
  _.transform(obj, (acc: TObject, value, key: string, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);
    acc[camelKey] = _.isObject(value) ? toCamelCase(value) : value;
  });

const populatePoliticians = async (connection: Connection): Promise<void> => {
  const politicians = await DataSourceUtil.loadEntities("politicians");

  const formattedPoliticians = politicians.map((politician) => {
    if (politician.party) {
      return {
        ...politician,
        party: politician.party.id,
      };
    }

    return politician;
  });

  await connection
    .createQueryBuilder()
    .insert()
    .into(Politician)
    .values(toCamelCase(formattedPoliticians))
    .execute();
};

const populateDb = async (): Promise<void> => {
  // const parties = await DataSourceUtil.loadEntities("parties");
  // console.log(toCamelCase(politicians)[0]);

  const connection = await prepareConnection();

  populatePoliticians(connection);
};

populateDb();
