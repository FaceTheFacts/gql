import type {
  ApiCommittee,
  ApiConstituency,
  ApiElectoralList,
  ApiFraction,
  ApiParliament,
  ApiParliamentPeriod,
  ApiParty,
  ApiPolitician,
  ApiTopic,
} from "./api";

export interface ApiEntities {
  politicians: ApiPolitician;
  parties: ApiParty;
  parliaments: ApiParliament;
  "parliament-periods": ApiParliamentPeriod;
  topics: ApiTopic;
  committees: ApiCommittee;
  fractions: ApiFraction;
  constituencies: ApiConstituency;
  "electoral-lists": ApiElectoralList;
}
