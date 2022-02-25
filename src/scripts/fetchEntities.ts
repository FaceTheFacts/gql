import { DataSourceUtil } from "../utils/classes/DataSourceUtil";

const main = async (): Promise<void> => {
  const apiParties = await DataSourceUtil.loadEntities("parties");
  console.log(apiParties);
};

main();
