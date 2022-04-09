import { DataSourceUtil } from "../src/utils/classes/DataSourceUtil";

const fetchEntities = async (): Promise<void> => {
  await DataSourceUtil.loadEntities("parties");
  const foo = await DataSourceUtil.loadEntities("politicians");
  console.log(foo);
};

fetchEntities();
