import { Emotion } from "./emotions";
import { User } from "./users";

export type EntreeJournal={
    id : number,
    titre : string,
    intensite : number,
    date_ressentie : string,

    utilisateur : User,

    emotion : Emotion
}