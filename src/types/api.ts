import { MandateWonEnum } from "../enums/entities";

interface ApiMeta {
  abgeordnetenwatch_api: {
    version: string;
    changelog: string;
    licence: string;
    licence_link: string;
    documentation: string;
  };
  status: string;
  status_message: string;
  result: {
    count: number;
    total: number;
    range_start: number;
    range_end: number;
  };
}

export interface ApiResponse<T> {
  meta: ApiMeta;
  data: T;
}

interface ApiBase {
  id: number;
  entity_type: string;
  label: string;
  api_url: string;
  // TODO: add to entities
  // abgeordnetenwatch_url: string;
}

export interface ApiParliament extends ApiBase {
  label_external_long: string;
  current_project: ApiParliamentPeriod;
}

type TParliamentPeriod = "election" | "legislature";

export interface ApiParliamentPeriod extends ApiBase {
  parliament: ApiParliament;
  previous_period: ApiParliamentPeriod;
  type: TParliamentPeriod;
  election_date?: Date;
  start_date_period: Date;
  end_date_period: Date;
}

type TPoliticianSex = "m" | "f" | "d";

export interface ApiPolitician extends ApiBase {
  abgeordnetenwatch_url: string;
  first_name: string;
  last_name: string;
  birth_name?: string;
  sex?: TPoliticianSex;
  year_of_birth?: number;
  party: ApiParty;
  party_past?: string;
  deceased?: boolean;
  deceased_date?: Date;
  education: string;
  residence?: string;
  occupation?: string;
  statistic_questions?: string;
  statistic_questions_answered?: string;
  qid_wikidata?: string;
  field_title?: string;
}

type TMandateWon = "constituency" | "list" | "moved_up";

interface ApiElectoralData extends ApiBase {
  listPosition?: number;
  constituencyResult?: number;
  constituencyResultCount?: number;
  mandateWon: TMandateWon;
  electoralList: ApiElectoralList;
  constituency: ApiConstituency;
}

interface APiFractionMembership extends Omit<ApiBase, "api_url"> {
  validFrom: Date;
  validUntil: Date;
  fraction: ApiFraction;
  candidacyMandate: ApiCandidacyMandate;
}

type TCandidacyMandate = "candidacy" | "mandate";

export interface ApiCandidacyMandate extends ApiBase {
  id_external_administration?: string;
  id_external_administration_description?: string;
  type: TCandidacyMandate;
  parliament_period: ApiParliamentPeriod;
  politician: ApiPolitician;
  start_date?: Date;
  end_date?: Date;
  party?: ApiParty;
  info?: string;
  electoralData: ApiElectoralData;
  fractionMemberships: APiFractionMembership[];
}

export interface ApiCommittee extends ApiBase {
  field_legislature: ApiParliamentPeriod;
  field_topics: ApiTopic;
}

type TCommitteeMembershipRole =
  | "chairperson"
  | "vice_chairperson"
  | "foreperson"
  | "spokesperson"
  | "alternate_spokesperson"
  | "secretary"
  | "alternate_secretary"
  | "advisory_member"
  | "eligible_member"
  | "member"
  | "alternate_member";

export interface ApiCommitteeMembership extends ApiBase {
  committee: ApiCommittee;
  candidacy_mandate: ApiCandidacyMandate;
  committee_role: TCommitteeMembershipRole;
  start_date?: Date;
  end_date?: Date;
}

type THtmlText = string;
type TLink = {
  uri: string;
  title: string;
};

export interface ApiPoll extends ApiBase {
  abgeordnetenwatch_url: string;
  field_committees?: ApiCommittee;
  field_intro?: THtmlText;
  field_legislature: ApiParliamentPeriod;
  field_poll_date: Date;
  field_related_links: TLink[];
  field_topics: ApiTopic[];
}

type TVote = "yes" | "no" | "abstain" | "no_show";
type TReasonNoShow = "maternity_protection" | "fell_ill" | "other";

export interface ApiVotes extends ApiBase {
  mandate: ApiCandidacyMandate;
  fraction: ApiFraction;
  poll: ApiPoll;
  vote: TVote;
  reason_no_show?: TReasonNoShow;
  reason_no_show_other?: string;
}

export interface ApiParty extends ApiBase {
  full_name: string;
  short_name: string;
}

export interface ApiFraction extends ApiBase {
  full_name: string;
  short_name: string;
  legislature: ApiParliamentPeriod;
}

export interface ApiElectoralList extends ApiBase {
  name: string;
  parliament_period: ApiParliamentPeriod;
}

export interface ApiConstituency extends ApiBase {
  name: string;
  number?: number;
  parliament_period: ApiParliamentPeriod;
}

export interface ApiElectionProgram extends ApiBase {
  parliament_period: ApiParliamentPeriod;
  party: ApiParty;
  link: TLink[];
  file?: string;
}

export type TIncomeLevel =
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10";

export type TSidejobCategory =
  | "29231"
  | "29647"
  | "29229"
  | "29228"
  | "29230"
  | "29232"
  | "29233";

export type TSidejobIncomeInterval = "0" | "1" | "2";

export interface ApiSidejob extends ApiBase {
  job_title_extra?: string;
  additional_information?: string;
  mandates: ApiCandidacyMandate[];
  category: TSidejobCategory;
  income_level?: TIncomeLevel;
  interval?: TSidejobIncomeInterval;
  data_change_date?: Date;
  created: number;
  sidejob_organization: ApiSidejobOrganization;
  field_city?: ApiCity;
  field_country?: ApiCountry;
  field_topics: ApiTopic[];
}

export interface ApiSidejobOrganization extends ApiBase {
  field_city?: ApiCity;
  field_country?: ApiCountry;
  field_topics: ApiTopic[];
}

export interface ApiTopic extends ApiBase {
  abgeordnetenwatch_url: string;
  description?: string;
  parent: ApiTopic;
}

export interface ApiCity extends ApiBase {}

export interface ApiCountry extends ApiBase {}
