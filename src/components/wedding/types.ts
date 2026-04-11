export type SurveyData = {
  name: string;
  attending: "yes" | "no" | "maybe" | "";
  guests: string;
  children: string;
  alcohol: string[];
  secondDay: "yes" | "no" | "maybe" | "";
  transfer: "yes" | "no" | "";
  dietary: string;
  song: string;
  message: string;
};