import {
  apiCreateEntreeJournal,
  apiGetAllEmotions,
  apiGetEntreeById,
  apiUpdateEntreeJournal,
} from "@/services/trackerApi";
import { Emotion } from "@/types/emotions";
import { Message } from "@/types/message";
import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TrackerFormCard from "./TrackerFormCard";
import TrackerFormHeader from "./TrackerFormHeader";
import TrackerFormLoading from "./TrackerFormLoading";
import TrackerFormMessage from "./TrackerFormMessage";
import { addTrackerStyles } from "./module.TrackerForm.style";

type Props = Readonly<{
  mode: "create" | "edit";
  entryId?: number;
}>;

export default function TrackerForm({ mode, entryId }: Props) {
  const isEditMode = mode === "edit";

  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [selectedTypeEmotionId, setSelectedTypeEmotionId] = useState<number | null>(null);

  const [titre, setTitre] = useState("");
  const [intensite, setIntensite] = useState(5);
  const [dateRessentie, setDateRessentie] = useState(new Date().toISOString());

  const [isLoading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const typesEmotion = useMemo(() => {
    const map = new Map<number, NonNullable<Emotion["type_emotion"]>>();

    emotions.forEach((emotion) => {
      if (emotion.type_emotion?.id) {
        map.set(emotion.type_emotion.id, emotion.type_emotion);
      }
    });

    return Array.from(map.values());
  }, [emotions]);

  const selectedEmotion = useMemo(() => {
    if (!selectedTypeEmotionId) {
      return null;
    }

    return (
      emotions.find((emotion) => {
        const sameType = emotion.type_emotion?.id === selectedTypeEmotionId;

        const min = emotion.intensite_min ?? 1;
        const max = emotion.intensite_max ?? 10;

        return sameType && intensite >= min && intensite <= max;
      }) ?? null
    );
  }, [emotions, selectedTypeEmotionId, intensite]);

  async function loadData() {
    try {
      setMessage(null);
      setLoading(true);

      const emotionsResponse = await apiGetAllEmotions();

      setEmotions(emotionsResponse.data);

      if (isEditMode && entryId) {
        const entryResponse = await apiGetEntreeById(entryId);
        const entry = entryResponse.data;

        setTitre(entry.titre ?? "");
        setIntensite(entry.intensite ?? 5);
        setDateRessentie(entry.date_ressentie ?? new Date().toISOString());
        setSelectedTypeEmotionId(entry.emotion?.type_emotion?.id ?? null);
      }
    } catch (e: any) {
      setMessage({
        type: "error",
        text:
          e?.message ||
          "Impossible de charger les informations du journal d’émotion.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function saveEntry() {
    console.log("saveEntry appelé");

    setMessage(null);

    if (!selectedTypeEmotionId) {
      setMessage({
        type: "error",
        text: "Il faut sélectionner un type d’émotion.",
      });

      return;
    }

    if (!selectedEmotion) {
      console.log("Aucune émotion détectée :", {
        selectedTypeEmotionId,
        intensite,
        emotions,
      });

      setMessage({
        type: "error",
        text: "Aucune émotion ne correspond à ce type et cette intensité.",
      });

      return;
    }

    const emotionId = Number(selectedEmotion.id);

    if (!emotionId || Number.isNaN(emotionId)) {
      console.log("Émotion détectée invalide :", selectedEmotion);

      setMessage({
        type: "error",
        text: "L’émotion détectée est invalide.",
      });

      return;
    }

    const payload = {
      titre: titre.trim() || null,
      intensite: intensite,
      date_ressentie: dateRessentie,
      emotion_id: emotionId,
    };

    console.log("selectedEmotion :", selectedEmotion);
    console.log("payload envoyé :", JSON.stringify(payload));

    try {
      setSaving(true);

      if (isEditMode && entryId) {
        await apiUpdateEntreeJournal(entryId, payload);

        setMessage({
          type: "success",
          text: "Entrée modifiée avec succès ✅",
        });
      } else {
        await apiCreateEntreeJournal(payload);

        setMessage({
          type: "success",
          text: "Émotion ajoutée au journal ✅",
        });
      }

      setTimeout(() => {
        router.replace("/(tabs)/trackerEmotion");
      }, 700);
    } catch (e: any) {
      setMessage({
        type: "error",
        text:
          e?.message ||
          (isEditMode
            ? "Impossible de modifier l’entrée du journal."
            : "Impossible d’ajouter l’émotion au journal."),
      });
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [entryId]);

  if (isLoading) {
    return <TrackerFormLoading />;
  }

  return (
    <SafeAreaView style={addTrackerStyles.screen}>
      <ScrollView
        contentContainerStyle={addTrackerStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <TrackerFormHeader isEditMode={isEditMode} />

        <TrackerFormMessage message={message} />

        <TrackerFormCard
          typesEmotion={typesEmotion}
          selectedTypeEmotionId={selectedTypeEmotionId}
          setSelectedTypeEmotionId={setSelectedTypeEmotionId}
          intensite={intensite}
          setIntensite={setIntensite}
          titre={titre}
          setTitre={setTitre}
          selectedEmotion={selectedEmotion}
          saveEntry={saveEntry}
          saving={saving}
          isEditMode={isEditMode}
        />
      </ScrollView>
    </SafeAreaView>
  );
}