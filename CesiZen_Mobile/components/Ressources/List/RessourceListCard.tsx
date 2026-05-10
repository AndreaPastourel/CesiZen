
import { formatDate } from "@/config/Format";
import { Ressource } from "@/types/ressources";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ressourcesStyles } from "./module.RessourcesList.style";

type Props = Readonly<{
  ressource: Ressource;
}>;


export default function RessourceListCard({ ressource }: Props) {

  function handleOpenRessource() {
  router.push({
    pathname: "/ressources/[id]",
    params: {
      id: ressource.id,
    },
  });
    }



  return (

    <View style={ressourcesStyles.card}>
      <View style={ressourcesStyles.cardTop}>
         <Text style={ressourcesStyles.badge}>
          {ressource.type?.libelle ?? "Ressource"}
        </Text>

        <Text
          style={
            ressource.est_actif
              ? ressourcesStyles.statusActive
              : ressourcesStyles.statusInactive
          }
        >
          {ressource.est_actif ? "Active" : "Inactive"}
        </Text>
      </View>


      <View style={ressourcesStyles.cardContent}>
  
        <Text style={ressourcesStyles.cardTitle}>{ressource.titre}</Text>

        <Text style={ressourcesStyles.cardResume} numberOfLines={3}>
          {ressource.resume || "Aucun résumé disponible."}
        </Text>

        <View style={ressourcesStyles.metaList}>
          <Text style={ressourcesStyles.metaText}>
            <Text style={ressourcesStyles.metaStrong}>Catégorie : </Text>
            {ressource.categorie?.nom ?? "Non renseignée"}
          </Text>

          <Text style={ressourcesStyles.metaText}>
            <Text style={ressourcesStyles.metaStrong}>Auteur : </Text>
            {ressource.auteur?.pseudo ?? "Non renseigné"}
          </Text>

          <Text style={ressourcesStyles.metaText}>
            <Text style={ressourcesStyles.metaStrong}>Publié le : </Text>
            {formatDate(ressource.date_publication)}
          </Text>
        </View>
      </View>

      <View style={ressourcesStyles.cardFooter}>
        {ressource.nom_fichier ? (
          <Text style={ressourcesStyles.fileInfo} numberOfLines={1}>
            {ressource.nom_fichier}
          </Text>
        ) : null}

       <Pressable
        onPress={handleOpenRessource}
        style={({ pressed }) => [
            ressourcesStyles.cardButton,
            pressed ? ressourcesStyles.cardButtonPressed : null,
        ]}
        >
        <Text style={ressourcesStyles.cardButtonText}>Voir la ressource</Text>
        </Pressable>
      </View>
    </View>
  );
}