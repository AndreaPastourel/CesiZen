
import TrackerForm from "@/components/Tracker/Form/TrackerForm";
import { useLocalSearchParams } from "expo-router";

export default function EditTrackerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const numericId = Number(id);

  return (
    <TrackerForm
      mode="edit"
      entryId={Number.isNaN(numericId) ? undefined : numericId}
    />
  );
}