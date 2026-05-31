import { API_BASE_URL } from "@/config/api";
import { Image, Linking, Pressable, Text, View } from "react-native";
import { formatDuration, formatFileSize } from "../../../config/Format";
import { Ressource } from "../../../types/ressources";
import { ressourceDetailStyles } from "./module.RessourceDetail.style";

type Props = {
  ressource: Ressource | null;
};

function buildMediaUrl(path: string | null | undefined) {
  if (!path) {
    return null;
  }

  if (path.startsWith("http")) {
    return path;
  }

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "").replace(
    /\/$/,
    ""
  );

  const formattedPath = path.startsWith("/") ? path : `/${path}`;

  return `${backendBaseUrl}${formattedPath}`;
}

function isImageFile(fileName: string | null | undefined) {
  if (!fileName) {
    return false;
  }

  return /\.(jpg|jpeg|png|webp|gif)$/i.test(fileName);
}

function isVideoFile(fileName: string | null | undefined) {
  if (!fileName) {
    return false;
  }

  return /\.(mp4|mov|avi|webm)$/i.test(fileName);
}

export default function DetailMedia({ ressource }: Readonly<Props>) {
  if (!ressource) {
    return null;
  }

  const rawMediaPath =
    (ressource as any).chemin_media ?? (ressource as any).cheminMedia ?? null;

  const mediaUrl = buildMediaUrl(rawMediaPath);

  if (!mediaUrl) {
    return null;
  }

  const formattedDuration = formatDuration(ressource.duree_seconde);

  const formattedSize = formatFileSize(ressource.taille_fichier_ko);

  const isVideo =
    ressource.duree_seconde !== null || isVideoFile(ressource.nom_fichier);

  const isImage =
    !isVideo &&
    (ressource.largeur_px !== null ||
      ressource.hauteur_px !== null ||
      isImageFile(ressource.nom_fichier));

  const isDocument = !isVideo && !isImage;

  const imageAspectRatio =
    ressource.largeur_px && ressource.hauteur_px
      ? ressource.largeur_px / ressource.hauteur_px
      : 16 / 9;

 async function openMedia() {
  if (!mediaUrl) {
    return;
  }

  await Linking.openURL(mediaUrl);
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