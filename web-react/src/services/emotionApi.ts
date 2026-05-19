import { Emotion } from "../types/emotions";
import { TypeEmotion } from "../types/typesEmotion";
import { httpRequest } from "./httpClient";

type TypesEmotionResponse = {
  data: TypeEmotion[],
  message: string | null,
};

type TypeEmotionResponse = {
  data: TypeEmotion,
  message: string | null,
};

type EmotionsResponse = {
  data: Emotion[],
  message: string | null,
};

type EmotionResponse = {
  data: Emotion,
  message: string | null,
};

export type TypeEmotionPayload = {
  nom: string,
  description: string | null,
  couleur: string | null,
};

export async function apiGetAllTypesEmotion(): Promise<TypesEmotionResponse> {
  return httpRequest<TypesEmotionResponse>({
    method: "GET",
    path: "/types-emotions",
  });
}

export async function apiGetAllEmotions(): Promise<EmotionsResponse> {
  return httpRequest<EmotionsResponse>({
    method: "GET",
    path: "/emotions",
  });
}

export async function apiCreateTypeEmotion(
  payload: TypeEmotionPayload
): Promise<TypeEmotionResponse> {
  return httpRequest<TypeEmotionResponse>({
    method: "POST",
    path: "/types-emotion",
    body: payload,
  });
}

export async function apiUpdateTypeEmotion(
  id: number,
  payload: TypeEmotionPayload
): Promise<TypeEmotionResponse> {
  return httpRequest<TypeEmotionResponse>({
    method: "PATCH",
    path: `/types-emotion/${id}`,
    body: payload,
  });
}

export async function apiCreateEmotion(
  formData: FormData
): Promise<EmotionResponse> {
  return httpRequest<EmotionResponse>({
    method: "POST",
    path: "/emotions",
    body: formData,
  });
}

export async function apiUpdateEmotion(
  id: number,
  formData: FormData
): Promise<EmotionResponse> {
  return httpRequest<EmotionResponse>({
    method: "POST",
    path: `/emotions/${id}/update`,
    body: formData,
  });
}