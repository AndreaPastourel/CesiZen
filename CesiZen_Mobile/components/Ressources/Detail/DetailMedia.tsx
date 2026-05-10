import { Image, Linking, Pressable, Text, View } from "react-native";
import { formatDuration, formatFileSize } from "../../../config/Format";
import { Ressource } from "../../../types/ressources";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";


type Props = {
  ressource: Ressource;
};


export default function DetailMedia({ ressource }: Readonly<Props>) {

  if (!ressource.chemin_media) {
    
    return null;
  }

  const mediaUrl = ressource.chemin_media;

  const isVideo = ressource.duree_seconde !== null;

  const isImage =
    ressource.duree_seconde === null &&
    (ressource.largeur_px !== null || ressource.hauteur_px !== null);

  const isDocument = !isVideo && !isImage;

  const formattedDuration = formatDuration(ressource.duree_seconde);

  const formattedSize = formatFileSize(ressource.taille_fichier_ko);

  const imageAspectRatio =
    ressource.largeur_px && ressource.hauteur_px
      ? ressource.largeur_px / ressource.hauteur_px
      : 16 / 9;

  async function openMedia() {
    const canOpen = await Linking.canOpenURL(mediaUrl);

    if (canOpen) {
      await Linking.openURL(mediaUrl);
    }
  }

  return (
    <View style={ressourceDetailStyles.mediaBox}>
      <View style={ressourceDetailStyles.mediaHeader}>
        <View style={ressourceDetailStyles.mediaHeaderText}>
          <Text style={ressourceDetailStyles.mediaTitle}>Média associé</Text>

          {ressource.nom_fichier ? (
            <Text style={ressourceDetailStyles.fileName} numberOfLines={1}>
              {ressource.nom_fichier}
            </Text>
          ) : null}

          {formattedSize ? (
            <Text style={ressourceDetailStyles.mediaInfo}>
              Taille : {formattedSize}
            </Text>
          ) : null}
        </View>

        <Pressable
          onPress={openMedia}
          style={({ pressed }) => [
            ressourceDetailStyles.mediaLink,
            pressed ? ressourceDetailStyles.mediaLinkPressed : null,
          ]}
        >
          <Text style={ressourceDetailStyles.mediaLinkText}>Ouvrir</Text>
        </Pressable>
      </View>

      {isImage ? (
        <View
          style={[
            ressourceDetailStyles.imageWrapper,
            { aspectRatio: imageAspectRatio },
          ]}
        >
          <Image
            source={{ uri: mediaUrl }}
            accessibilityLabel={`Illustration de la ressource : ${ressource.titre}`}
            style={ressourceDetailStyles.mediaImage}
            resizeMode="cover"
          />
        </View>
      ) : null}


      {isVideo ? (
        <View style={ressourceDetailStyles.videoBox}>
          <Text style={ressourceDetailStyles.documentIcon}>VID</Text>

          <View style={ressourceDetailStyles.documentContent}>
            <Text style={ressourceDetailStyles.documentTitle}>
              Vidéo associée
            </Text>

            <Text style={ressourceDetailStyles.documentText}>
              Cette vidéo peut être ouverte depuis le bouton ci-dessus.
            </Text>

    
            {formattedDuration ? (
              <Text style={ressourceDetailStyles.mediaInfo}>
                Durée : {formattedDuration}
              </Text>
            ) : null}
          </View>
        </View>
      ) : null}

      {isDocument ? (
        <View style={ressourceDetailStyles.documentBox}>
          <Text style={ressourceDetailStyles.documentIcon}>DOC</Text>

        
          <View style={ressourceDetailStyles.documentContent}>
            <Text style={ressourceDetailStyles.documentTitle}>
              Document associé
            </Text>


            <Text style={ressourceDetailStyles.documentText}>
              Ce fichier peut être ouvert depuis le bouton ci-dessus.
              {formattedSize ? ` Taille du fichier : ${formattedSize}.` : ""}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}