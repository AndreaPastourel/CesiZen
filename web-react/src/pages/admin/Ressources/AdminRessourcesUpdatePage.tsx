import { Navigate, useParams } from "react-router-dom";
import CreateRessourceForm from "../../../components/Admin/Ressources/Create/CreateRessourceForm";

export default function AdminRessourceUpdatePage() {
  const { id } = useParams();

  const ressourceId = Number(id);

  if (!id || Number.isNaN(ressourceId)) {
    return <Navigate to="/admin/ressources" replace />;
  }

  return <CreateRessourceForm ressourceId={ressourceId} />;
}