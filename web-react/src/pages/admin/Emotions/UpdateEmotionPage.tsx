import { Navigate, useParams } from "react-router-dom";
import CreateEmotionForm from "../../../components/Admin/Emotions/CreateEmotion/CreateEmotionForm";

export default function UpdateEmotionPage() {
  const { id } = useParams();

  const rawId = typeof id === "string" ? parseInt(id, 10) : null;

  const safeEmotionId =
    rawId !== null && !Number.isNaN(rawId) ? rawId : null;

  console.log("UpdateEmotionPage id :", id);
  console.log("UpdateEmotionPage safeEmotionId :", safeEmotionId);

  if (!safeEmotionId) {
    return <Navigate to="/admin/emotions" replace />;
  }

  return <CreateEmotionForm emotionId={safeEmotionId} />;
}