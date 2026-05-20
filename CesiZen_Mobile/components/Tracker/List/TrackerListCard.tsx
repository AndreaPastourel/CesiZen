import { formatDate } from "@/config/Format";
import { EntreeJournal } from "@/types/entreesJournal";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { emotionJournalStyles } from "./module.TrackerList.style";
import { router } from "expo-router";

type Props = {
  entry: EntreeJournal;
  emotionColor: string;
  emotionIconUrl: string | null;
};

export default function TrackerListCard({
  entry,
  emotionColor,
  emotionIconUrl,
}: Readonly<Props>) {
  const emotionName = entry.emotion?.nom ?? "Émotion non renseignée";

  const typeEmotionName =
    entry.emotion?.type_emotion?.nom ?? "Type non renseigné";

  const fallbackLetter = emotionName.charAt(0).toUpperCase();

  return (
    <View key={entry.id} style={emotionJournalStyles.card}>
      <View style={emotionJournalStyles.cardTop}>
        <View
          style={[
            emotionJournalStyles.emotionIconBubble,
            { backgroundColor: emotionColor },
          ]}
        >
          {emotionIconUrl ? (
            <Image
              source={{ uri: emotionIconUrl }}
              style={emotionJournalStyles.emotionIcon}
              contentFit="contain"
            />
          ) : (
            <Text style={emotionJournalStyles.emotionIconFallback}>
              {fallbackLetter}
            </Text>
          )}
        </View>

        <View style={emotionJournalStyles.cardTopText}>
          <Text style={emotionJournalStyles.dateText}>
            {formatDate(entry.date_ressentie)}
          </Text>

          <Text style={emotionJournalStyles.cardSubtitle}>
            {typeEmotionName}
          </Text>
        </View>
      </View>

      <Text style={emotionJournalStyles.cardTitle}>{emotionName}</Text>

      {entry.intensite ? (
        <View style={emotionJournalStyles.intensityPill}>
          <Text style={emotionJournalStyles.intensityText}>
            Intensité : {entry.intensite}/10
          </Text>
        </View>
      ) : null}

      {entry.titre ? (
        <Text style={emotionJournalStyles.noteText} numberOfLines={3}>
          {entry.titre}
        </Text>
      ) : null}

      <Pressable
      onPress={() =>
        router.push({
          pathname: "/UpdateTracker/[id]",
          params: {
            id: String(entry.id),
          },
        })
      }
      style={({ pressed }) => [
        emotionJournalStyles.editButton,
        pressed ? emotionJournalStyles.editButtonPressed : null,
      ]}
    >
      <Text style={emotionJournalStyles.editButtonText}>Modifier</Text>
    </Pressable>
    </View>
  );
}