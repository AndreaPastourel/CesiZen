
import { httpRequest } from "./httpClient";
import { EntreeJournal } from "@/types/entreesJournal";
import { Emotion } from "@/types/emotions";

type EmotionsResponse = {
  data: Emotion[];
};

type CreateEntreeJournalPayload = {
  titre: string | null;
  intensite: number;
  date_ressentie: string;
  emotion_id: number;
};

type EntreeJournalResponse = {
  data: EntreeJournal;
  message: string | null;
};

type TrackerResponse = {
    data : EntreeJournal[],
    message : string |null,
}


export async function apiGetAllTracker() : Promise<TrackerResponse> {
    const res = await httpRequest<TrackerResponse>({
        method:"GET",
        path:"/journal",
    });

    return res
}


export async function apiGetEntreeById(id:number) : Promise<EntreeJournalResponse>{
    
    const res = await httpRequest<EntreeJournalResponse>({
        method:"GET",
        path:`/entree-journal/${id}` ,
    });

    return res
}


export async function apiGetAllEmotions(): Promise<EmotionsResponse> {
  return httpRequest<EmotionsResponse>({
    method: "GET",
    path: "/emotions",
  });
}

export async function apiCreateEntreeJournal(
  payload: CreateEntreeJournalPayload
): Promise<EntreeJournalResponse> {
  return httpRequest<EntreeJournalResponse>({
    method: "POST",
    path: "/entree-journal",
    body: payload,
  });
}

export async function apiUpdateEntreeJournal(
  id: number,
  payload: CreateEntreeJournalPayload
): Promise<EntreeJournalResponse> {
  return httpRequest<EntreeJournalResponse>({
    method: "PATCH",
    path: `/entree-journal/${id}`,
    body: payload,
  });
}