// @ts-nocheck
import { loadEntities } from "./loadEntities";

const main = async (): Promise<void> => {
  const apiParties = await loadEntities("parties");
  console.log(apiParties);
};

main();
