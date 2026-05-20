import { Navigate, useParams } from "react-router-dom";
import CreateTypeEmotionForm from "../../../components/Admin/Emotions/CreateTypeEmotion/CreateTypeEmotionForm";

export default function EditTypeEmotionPage() {
  const { id } = useParams();

  const typeEmotionId = id ? parseInt(id, 10) : null;

  if (!typeEmotionId || Number.isNaN(typeEmotionId)) {
    return <Navigate to="/admin/emotions" replace />;
  }

  return <CreateTypeEmotionForm typeEmotionId={typeEmotionId} />;
}