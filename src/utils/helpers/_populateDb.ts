// @ts-nocheck
import _ from "lodash";

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

const populateDb = async (): Promise<void> => {
  // const parties = await DataSourceUtil.loadEntities("parties");
  // const politicians = await DataSourceUtil.loadEntities("politicians");
  // console.log(toCamelCase(politicians)[0]);

//   const formattedPoliticians = politicians.map(politician => {

//   })





}

                                              ({
  //   ...politician,
  //   ...(party && { party: politician.party.id }),
  //   // // x: politician.party.id
  //   // party: politician.party.id,
  // }));

  // for (const pol of politicians) {
  //   if (!pol.party) {
  //     console.log(pol);
  //   }
  // }

  // console.log(politicians[0]);
  // console.log(formattedPolitician[0]);

  // const connection = await prepareConnection();

  // console.log(politicians[0]);

  // await connection
  //   .createQueryBuilder()
  //   .insert()
  //   .into(Party)
  //   .values(toCamelCase(parties))
  //   .execute();

  // await connection
  //   .createQueryBuilder()
  //   .insert()
  //   .into(Politician)
  //   .values(toCamelCase(politicians))
  //   .execute();

populateDb();
