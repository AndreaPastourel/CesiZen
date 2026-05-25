import { Navigate, useParams } from "react-router-dom";
import TypeRessourceForm from "../../../../components/Admin/Ressources/TypesRessources/Form/TypesRessourcesForm";


export default function UpdateTypesRessourcesPage() {
  const { id } = useParams();

  const typeId = Number(id);

  if (!id || Number.isNaN(typeId)) {
    return <Navigate to="/admin/types-ressources" replace />;
  }

  return <TypeRessourceForm typeRessourceId={typeId}/>;
}