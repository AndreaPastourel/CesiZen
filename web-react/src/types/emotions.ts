import { TypeEmotion } from "./typesEmotion";

export type Emotion = {
  id: number,
  nom: string,
  description: string | null,
  intensite_min: number,
  intensite_max: number,
  couleur: string | null,
  icone: string | null,
  created_at: string | null,
  updated_at: string | null,
  type_emotion: TypeEmotion,
};