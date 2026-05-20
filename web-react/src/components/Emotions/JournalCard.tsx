
import { ReactNode } from "react";
import { formatDate } from "../../config/Format"
import { EntreeJournal } from "../../types/entreesJournal";
import styles from "./module.JournalStats.module.css"

type StatItem = {
  id: number;
  nom: string;
  couleur: string | null;
  count: number;
};

type Props = {
  filteredEntries: EntreeJournal[];
  getPeriodLabel: () => string;
  formatIntensity: (value: number | null) => string;
  averageIntensity: number | null;
  dominantType: StatItem | null;
  dominantEmotion: StatItem | null;
  renderStatList: (items: StatItem[]) => ReactNode;
  typeStats: StatItem[];
  emotionStats: StatItem[];
  lastEntries: EntreeJournal[];
};
export default function JournalCard({filteredEntries,getPeriodLabel,formatIntensity,averageIntensity,dominantType,dominantEmotion,renderStatList,
                                    typeStats,emotionStats,lastEntries}:Readonly<Props>){


    return(
        <>
        <section className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <p className={styles.cardLabel}>Entrées</p>
              <strong>{filteredEntries.length}</strong>
              <span>{getPeriodLabel()}</span>
            </article>

            <article className={styles.summaryCard}>
              <p className={styles.cardLabel}>Intensité moyenne</p>
              <strong>{formatIntensity(averageIntensity)}</strong>
              <span>sur les émotions renseignées</span>
            </article>

            <article className={styles.summaryCard}>
              <p className={styles.cardLabel}>Émotion dominante</p>
              <strong>{dominantType?.nom ?? "Non disponible"}</strong>
              <span>émotion principale la plus fréquente</span>
            </article>

            <article className={styles.summaryCard}>
              <p className={styles.cardLabel}>Sous-émotion dominante</p>
              <strong>{dominantEmotion?.nom ?? "Non disponible"}</strong>
              <span>émotion secondaire la plus fréquente</span>
            </article>
          </section>

          <section className={styles.contentGrid}>
            <article className={styles.panel}>
              <h2>Répartition des émotions principales</h2>
              {renderStatList(typeStats)}
            </article>

            <article className={styles.panel}>
              <h2>Répartition des émotions secondaires</h2>
              {renderStatList(emotionStats)}
            </article>
          </section>

          <section className={styles.panel}>
            <h2>Dernières entrées</h2>

            {lastEntries.length === 0 ? (
              <p className={styles.emptyText}>
                Aucune entrée sur cette période.
              </p>
            ) : (
              <div className={styles.entryList}>
                {lastEntries.map((entry) => (
                  <article className={styles.entryItem} key={entry.id}>
                    <div>
                      <strong>
                        {entry.emotion.type_emotion?.nom ?? "Émotion inconnue"}
                      </strong>

                      <p>
                        {entry.emotion?.nom ?? "Aucune sous-émotion"} — intensité{" "}
                        {entry.intensite}/10
                      </p>
                    </div>

                    <span>{formatDate(entry.date_ressentie)}</span>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
    )
}