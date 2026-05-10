import DetailCard from "@/components/Ressources/Detail/DetailCard";
import { useLocalSearchParams } from "expo-router";



export default function RessourceDetailScreen() {

     const { id } = useLocalSearchParams<{ id: string }>();

    return(
        <DetailCard
         id={Number(id)} />
    )
}