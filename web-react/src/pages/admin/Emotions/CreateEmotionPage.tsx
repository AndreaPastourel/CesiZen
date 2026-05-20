import { useParams } from "react-router-dom";
import CreateEmotionForm from "../../../components/Admin/Emotions/CreateEmotion/CreateEmotionForm";


export default function CreateEmotionPage(){
    const { id_type } = useParams();
      const rawId = typeof id_type === "string" ? parseInt(id_type, 10) : null;
      const safe_id_type = rawId !== null && !Number.isNaN(rawId) ? rawId : null;

  return(
    <CreateEmotionForm
    id_type={safe_id_type}
    />
  )
}