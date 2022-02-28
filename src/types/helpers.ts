import type {
  ApiParliament,
  ApiParliamentPeriod,
  ApiParty,
  ApiPolitician,
} from "./api";

export interface ApiEntities {
  politicians: ApiPolitician;
  parties: ApiParty;
  parliaments: ApiParliament;
  "parliament-periods": ApiParliamentPeriod;
}
