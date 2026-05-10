
import { useParams } from "react-router-dom";
import DetailCard from "../components/Ressources/Detail/DetailCard";

type Message = {
  type: "error";
  text: string;
} | null;


export default function RessourceDetailPage() {

  const { slug } = useParams();
  const safeSlug = typeof slug === "string" ? slug : null;

  return (
    <DetailCard 
    slug={safeSlug}/>
  )
}