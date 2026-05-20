import { Emotion } from "@/types/emotions";
import type { Dispatch, SetStateAction } from "react";
import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { addTrackerStyles } from "./module.TrackerForm.style";
import { router } from "expo-router";

type TypeEmotion = NonNullable<Emotion["type_emotion"]>;

type Props = Readonly<{
  typesEmotion: TypeEmotion[],
  selectedTypeEmotionId: number | null,
  setSelectedTypeEmotionId: Dispatch<SetStateAction<number | null>>,

  intensite: number,
  setIntensite: Dispatch<SetStateAction<number>>,

  titre: string;
  setTitre: Dispatch<SetStateAction<string>>,

  selectedEmotion: Emotion | null,

  saveEntry: () => Promise<void>,
  saving: boolean,
  isEditMode: boolean,
}>;

export default function TrackerFormCard({
  typesEmotion,
  selectedTypeEmotionId,
  setSelectedTypeEmotionId,
  intensite,
  setIntensite,
  titre,
  setTitre,
  selectedEmotion,
  saveEntry,
  saving,
  isEditMode,
}: Props) {
  return (
    <View style={addTrackerStyles.card}>
      <Text style={addTrackerStyles.sectionTitle}>
        Type d’émotion ressentie
      </Text>

      <View style={addTrackerStyles.emotionGrid}>
        {typesEmotion.map((typeEmotion) => {
          const isSelected = selectedTypeEmotionId === typeEmotion.id;

          const emotionColor = typeEmotion.couleur ?? "#5D7052";

          return (
            <Pressable
              key={typeEmotion.id}
              onPress={() => setSelectedTypeEmotionId(typeEmotion.id)}
              style={[
                addTrackerStyles.emotionChoice,
                isSelected ? addTrackerStyles.emotionChoiceSelected : null,
              ]}
            >
              <View style={addTrackerStyles.emotionChoiceTop}>
                <View
                  style={[
                    addTrackerStyles.emotionDot,
                    { backgroundColor: emotionColor },
                  ]}
                />

                <Text
                  style={[
                    addTrackerStyles.emotionName,
                    isSelected ? addTrackerStyles.emotionNameSelected : null,
                  ]}
                >
                  {typeEmotion.nom}
                </Text>
              </View>

              {typeEmotion.description ? (
                <Text style={addTrackerStyles.emotionType}>
                  {typeEmotion.description}
                </Text>
              ) : null}
            </Pressable>
          );
        })}
      </View>

      <Text style={addTrackerStyles.sectionTitle}>Intensité</Text>

      <View style={addTrackerStyles.intensityRow}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
          const isSelected = intensite === value;

          return (
            <Pressable
              key={value}
              onPress={() => setIntensite(value)}
              style={[
                addTrackerStyles.intensityButton,
                isSelected ? addTrackerStyles.intensityButtonSelected : null,
              ]}
            >
              <Text
                style={[
                  addTrackerStyles.intensityButtonText,
                  isSelected
                    ? addTrackerStyles.intensityButtonTextSelected
                    : null,
                ]}
              >
                {value}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={addTrackerStyles.detectedEmotionBox}>
        <Text style={addTrackerStyles.detectedEmotionLabel}>
          Émotion détectée
        </Text>

        <Text style={addTrackerStyles.detectedEmotionText}>
          {selectedEmotion
            ? selectedEmotion.nom
            : "Sélectionnez un type et une intensité."}
        </Text>
      </View>

      <Text style={addTrackerStyles.sectionTitle}>Note</Text>

      <TextInput
        value={titre}
        onChangeText={setTitre}
        style={addTrackerStyles.textArea}
        placeholder="Ex : Journée stressante, mais j’ai réussi à me poser."
        placeholderTextColor="#9B968B"
        multiline
        numberOfLines={4}
        textAlignVertical="top"
      />

      <View style={addTrackerStyles.actions}>
        <Pressable
          onPress={saveEntry}
          disabled={saving}
          style={({ pressed }) => [
            addTrackerStyles.primaryButton,
            pressed ? addTrackerStyles.buttonPressed : null,
            saving ? addTrackerStyles.buttonDisabled : null,
          ]}
        >
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={addTrackerStyles.primaryButtonText}>
              {isEditMode ? "Modifier l’entrée" : "Ajouter au journal"}
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => router.back()}
          disabled={saving}
          style={({ pressed }) => [
            addTrackerStyles.secondaryButton,
            pressed ? addTrackerStyles.buttonPressed : null,
          ]}
        >
          <Text style={addTrackerStyles.secondaryButtonText}>Annuler</Text>
        </Pressable>
      </View>
    </View>
  );
}