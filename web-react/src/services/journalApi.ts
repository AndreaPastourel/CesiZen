import { httpRequest } from "./httpClient";
import { Emotion } from "../types/emotions";
import { TypeEmotion } from "../types/typesEmotion";
import { EntreeJournal } from "../types/entreesJournal";

export type JournalEntry = {
  id: number;
  date_creation: string | null;
  date: string | null;
  intensite: number;
  note: string | null;
  type_emotion: TypeEmotion;
  emotion: Emotion | null;
};

type JournalResponse = {
  data: EntreeJournal[];
  message?: string | null;
};

export async function apiGetAllJournalEntries(): Promise<JournalResponse> {
  return  httpRequest<JournalResponse>({
    method: "GET",
    path: "/journal",
  });


}