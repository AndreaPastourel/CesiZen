import { useEffect, useMemo, useState } from "react";

import styles from "./module.JournalStats.module.css";

import { EntreeJournal } from "../../types/entreesJournal";
import { Message } from "../../types/message";

import { apiGetAllJournalEntries } from "../../services/journalApi";

import JournalHeader from "./JournalHeader";
import JournalMessage from "./JournalMessage";
import JournalLoading from "./JournalLoading";
import JournalCard from "./JournalCard";
import JournalItem from "./JournalItem";

type Period = "week" | "month";

type StatItem = {
  id: number;
  nom: string;
  couleur: string | null;
  count: number;
};

export default function JournalEmotionStats() {
  const [entries, setEntries] = useState<EntreeJournal[]>([]);
  const [period, setPeriod] = useState<Period>("week");
  const [message, setMessage] = useState<Message>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadJournalEntries() {
      setIsLoading(true);
      setMessage(null);

      try {
        const response = await apiGetAllJournalEntries();

        setEntries(response.data);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Impossible de récupérer le journal d’émotions.";

        setMessage({
          type: "error",
          text: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadJournalEntries();
  }, []);

  function buildRepartitionByType(
    filteredEntries: EntreeJournal[]
  ) {
    const map = new Map<number, StatItem>();

    filteredEntries.forEach((entry) => {
      const typeEmotion = entry.emotion.type_emotion;

      if (!typeEmotion) {
        return;
      }

      const current = map.get(typeEmotion.id);

      if (current) {
        map.set(typeEmotion.id, {
          ...current,
          count: current.count + 1,
        });

        return;
      }

      map.set(typeEmotion.id, {
        id: typeEmotion.id,
        nom: typeEmotion.nom,
        couleur: typeEmotion.couleur,
        count: 1,
      });
    });

    return Array.from(map.values()).sort(
      (a, b) => b.count - a.count
    );
  }

  function buildRepartitionByEmotion(
    filteredEntries: EntreeJournal[]
  ) {
    const map = new Map<number, StatItem>();

    filteredEntries.forEach((entry) => {
      const emotion = entry.emotion;

      if (!emotion) {
        return;
      }

      const current = map.get(emotion.id);

      if (current) {
        map.set(emotion.id, {
          ...current,
          count: current.count + 1,
        });

        return;
      }

      map.set(emotion.id, {
        id: emotion.id,
        nom: emotion.nom,
        couleur: emotion.couleur,
        count: 1,
      });
    });

    return Array.from(map.values()).sort(
      (a, b) => b.count - a.count
    );
  }

  const filteredEntries = useMemo(() => {
    const today = new Date();
    const limitDate = new Date();

    if (period === "week") {
      limitDate.setDate(today.getDate() - 7);
    } else {
      limitDate.setMonth(today.getMonth() - 1);
    }

    return entries.filter((entry) => {
      const rawDate = entry.date_ressentie;

      if (!rawDate) {
        return false;
      }

      const entryDate = new Date(rawDate);

      return (
        entryDate >= limitDate &&
        entryDate <= today
      );
    });
  }, [entries, period]);

  const typeStats = useMemo(() => {
    return buildRepartitionByType(filteredEntries);
  }, [filteredEntries]);

  const emotionStats = useMemo(() => {
    return buildRepartitionByEmotion(filteredEntries);
  }, [filteredEntries]);

  const averageIntensity = useMemo(() => {
    if (filteredEntries.length === 0) {
      return null;
    }

    const total = filteredEntries.reduce(
      (sum, entry) => {
        return sum + Number(entry.intensite ?? 0);
      },
      0
    );

    return total / filteredEntries.length;
  }, [filteredEntries]);

  const dominantType = typeStats[0] ?? null;
  const dominantEmotion = emotionStats[0] ?? null;

  const lastEntries = useMemo(() => {
    return [...filteredEntries]
      .sort((a, b) => {
        const dateA = new Date(
          a.date_ressentie ?? ""
        ).getTime();

        const dateB = new Date(
          b.date_ressentie ?? ""
        ).getTime();

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [filteredEntries]);

  function formatIntensity(value: number | null) {
    if (value === null) {
      return "Non disponible";
    }

    return `${value.toFixed(1)} / 10`;
  }

  function getPeriodLabel() {
    return period === "week"
      ? "sur les 7 derniers jours"
      : "sur le dernier mois";
  }

  function renderStatList(items: StatItem[]) {
    if (items.length === 0) {
      return (
        <p className={styles.emptyText}>
          Aucune donnée disponible.
        </p>
      );
    }

    return (
      <JournalItem
        items={items}
      />
    );
  }

  return (
    <main className={styles.statsPage}>
      <JournalHeader
        getPeriodLabel={getPeriodLabel}
        period={period}
        setPeriod={setPeriod}
      />

      <JournalMessage
        message={message}
      />

      <JournalLoading
        isLoading={isLoading}
      />

      {!isLoading && (
        <JournalCard
          filteredEntries={filteredEntries}
          getPeriodLabel={getPeriodLabel}
          formatIntensity={formatIntensity}
          averageIntensity={averageIntensity}
          dominantType={dominantType}
          dominantEmotion={dominantEmotion}
          renderStatList={renderStatList}
          typeStats={typeStats}
          emotionStats={emotionStats}
          lastEntries={lastEntries}
        />
      )}
    </main>
  );
}