import { prepareConnection } from "../../lib/prepareConnection";
import { populateElectoralLists } from "./electoralLists";
// import { populateConstituencies } from "./constituencies";
import { populateFractions } from "./fractions";
// import { populateCommittees } from "./committees";
// import { populateParliamentsAndParliamentPeriods } from "./parliamentsAndParliamentPeriods";
// import { populateTopics } from "./topics";
// import { populateParties } from "./parties";
// import { populatePoliticians } from "./politicians";

const populateDb = async (): Promise<void> => {
  const connection = await prepareConnection();
  // await populateParties(connection);
  // await populatePoliticians(connection);
  // await populateParliamentsAndParliamentPeriods(connection);
  // await populateTopics(connection);
  // await populateCommittees(connection);
  await populateFractions(connection);
  // await populateConstituencies(connection);
  await populateElectoralLists(connection);
};

populateDb();
