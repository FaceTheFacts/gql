import type { TIncomeLevel, TSidejobCategory } from "../types/api";

export const SIDEJOB_CATEGORY_MAP: Record<TSidejobCategory, string> = {
  "29231": "Beteiligung an Kapital- oder Personengesellschaften",
  "29647": "Entgeltliche Tätigkeiten neben dem Mandat",
  "29229": "Funktionen in Körperschaften und Anstalten des öffentlichen Rechts",
  "29228": "Funktionen in Unternehmen",
  "29230": "Funktionen in Vereinen, Verbänden und Stiftungen",
  "29232": "Spenden/Zuwendungen für politische Tätigkeit",
  "29233": "Vereinbarungen über künftige Tätigkeiten oder Vermögensvorteile",
};

export const INCOME_LEVEL_MAP: Record<TIncomeLevel, string> = {
  "1": "1.000 € bis 3.500 €",
  "2": "3.500 € bis 7.000 €",
  "3": "7.000 € bis 15.000 €",
  "4": "15.000 € bis 30.000 €",
  "5": "30.000 € bis 50.000 €",
  "6": "50.000 € bis 75.000 €",
  "7": "75.000 € bis 100.000 €",
  "8": "100.000 € bis 150.000 €",
  "9": "150.000 € bis 250.000 €",
  "10": "ab 250.000 €",
};

export const SIDEJOB_INTERVAL_MAP = {
  "0": "einmalig",
  "1": "monatlich",
  "2": "jährlich",
};
