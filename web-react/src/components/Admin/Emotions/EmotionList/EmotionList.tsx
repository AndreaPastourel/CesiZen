import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


import styles from "./module.EmotionList.module.css";
import { TypeEmotion } from "../../../../types/typesEmotion";
import { Emotion } from "../../../../types/emotions";
import { Message } from "../../../../types/message";
import { apiGetAllEmotions, apiGetAllTypesEmotion } from "../../../../services/emotionApi";
import { API_BASE_URL } from "../../../../config/api";
import EmotionListHeader from "./EmotionListHeader";
import EmotionListMessage from "./EmotionListMessage";
import EmotionListLoading from "./EmotionListLoading";
import EmotionListEmpty from "./EmotionListEmpty";

export default function EmotionList (){
  const [typesEmotion, setTypesEmotion] = useState<TypeEmotion[]>([]);
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    setMessage(null);

    try {
      const [typesResponse, emotionsResponse] = await Promise.all([
        apiGetAllTypesEmotion(),
        apiGetAllEmotions(),
      ]);

      setTypesEmotion(typesResponse.data ?? []);
      setEmotions(emotionsResponse.data ?? []);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de récupérer les émotions.";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function getEmotionsByType(typeEmotionId: number) {
    return emotions
      .filter((emotion) => emotion.type_emotion.id === typeEmotionId)
      .sort((a, b) => a.intensite_min - b.intensite_min);
  }

  function buildIconUrl(icone: string | null) {
    if (!icone) {
      return null;
    }

    const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(
      /\/$/,
      ""
    );

    if (icone.startsWith("http")) {
      return icone;
    }

    return backendBaseUrl + (icone.startsWith("/") ? icone : "/" + icone);
  }

  return (
    <main className={styles.adminPage}>
     <EmotionListHeader/>

    <EmotionListMessage
    message={message}
    />

     <EmotionListLoading 
     isLoading={isLoading}/>

     <EmotionListEmpty 
     isLoading={isLoading}
     typesEmotion={typesEmotion}/>

      {!isLoading && typesEmotion.length > 0 && (
        <section className={styles.typeGrid}>
          {typesEmotion.map((typeEmotion) => {
            const linkedEmotions = getEmotionsByType(typeEmotion.id);

            return (
              <article className={styles.typeCard} key={typeEmotion.id}>
                <div className={styles.typeHeader}>
                  <div className={styles.typeTitleBlock}>
                    <span
                      className={styles.colorDot}
                      style={{
                        backgroundColor: typeEmotion.couleur ?? "#5D7052",
                      }}
                    />

                    <div>
                      <h2>{typeEmotion.nom}</h2>

                      <p>{typeEmotion.description || "Aucune description."}</p>
                    </div>
                  </div>

                  <div className={styles.typeActions}>
                    <Link
                      to={`/admin/emotions/types/update/${typeEmotion.id}`}
                      className={styles.smallButton}
                    >
                      Modifier le type
                    </Link>

                    <Link
                      to={`/admin/emotions/create?type=${typeEmotion.id}`}
                      className={styles.smallButton}
                    >
                      Ajouter une émotion
                    </Link>
                  </div>
                </div>

                {linkedEmotions.length > 0 ? (
                  <div className={styles.emotionList}>
                    {linkedEmotions.map((emotion) => {
                      const iconUrl = buildIconUrl(emotion.icone);

                      return (
                        <div className={styles.emotionItem} key={emotion.id}>
                          <div className={styles.emotionInfo}>
                            <div className={styles.iconBox}>
                              {iconUrl ? (
                                <img
                                  src={iconUrl}
                                  alt={`Icône ${emotion.nom}`}
                                  className={styles.emotionIcon}
                                />
                              ) : (
                                <span
                                  className={styles.iconFallback}
                                  style={{
                                    backgroundColor:
                                      emotion.couleur ??
                                      typeEmotion.couleur ??
                                      "#5D7052",
                                  }}
                                >
                                  {emotion.nom.charAt(0)}
                                </span>
                              )}
                            </div>

                            <div>
                              <div className={styles.emotionTitleLine}>
                                <strong>{emotion.nom}</strong>

                                <span
                                  className={styles.emotionColorDot}
                                  style={{
                                    backgroundColor:
                                      emotion.couleur ??
                                      typeEmotion.couleur ??
                                      "#5D7052",
                                  }}
                                />
                              </div>

                              <small>
                                Intensité {emotion.intensite_min} à{" "}
                                {emotion.intensite_max}
                              </small>

                              <p>
                                {emotion.description || "Aucune description."}
                              </p>
                            </div>
                          </div>

                          <Link
                            to={`/admin/emotions/update/${emotion.id}`}
                            className={styles.smallButton}
                          >
                            Modifier
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className={styles.noEmotion}>
                    Aucune émotion secondaire pour ce type.
                  </p>
                )}
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}