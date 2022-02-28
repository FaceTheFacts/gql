import { prepareConnection } from "../../lib/prepareConnection";
import { populateParliamentsAndParliamentPeriods } from "./parliamentsAndParliamentPeriods";
// import { populateParties } from "./parties";
// import { populatePoliticians } from "./politicians";

const populateDb = async (): Promise<void> => {
  const connection = await prepareConnection();
  // await populateParties(connection);
  // await populatePoliticians(connection);
  await populateParliamentsAndParliamentPeriods(connection);
};

populateDb();
