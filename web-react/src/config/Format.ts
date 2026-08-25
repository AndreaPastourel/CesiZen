import { API_BASE_URL } from "./api";

type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

export function formatDate(date: string | null) {
    if (!date) {
      return "Date non renseignée";
    }

    return new Date(date).toLocaleDateString("fr-FR");
  }



  export function formatDuration(seconds : number |null){
    if(!seconds) return null;
    
    const minutes = Math.floor(seconds/60)
    const secondeRestante = seconds %60

    return `${minutes} min ${String(secondeRestante).padStart(2, "0")}`;

  }


  export function formatFileSize(sizeKo: number | null) {

    if (!sizeKo ) return null;


    if (sizeKo < 1024) {
      return `${sizeKo} Ko`;
    }
    const sizeMo = sizeKo / 1024;

    return `${sizeMo.toFixed(1)} Mo`;
  }


  export function createImageFileFromUri(uri: string) {
  const fileName = uri.split("/").pop() || "photo-profil.jpg";

  const extension = fileName.split(".").pop()?.toLowerCase();

  const mimeType =
    extension === "png"
      ? "image/png"
      : extension === "webp"
        ? "image/webp"
        : "image/jpeg";

  return {
    uri,
    name: fileName,
    type: mimeType,
  } as ImageFile;
}




export function buildPhotoUrl(photoPath: string | null | undefined) {
  if (!photoPath) {
    return "";
  }

  if (photoPath.startsWith("http")) {
    return photoPath;
  }

  const backendBaseUrl = API_BASE_URL.replace(/\/api\/?$/, "");

  return `${backendBaseUrl}${photoPath.startsWith("/") ? photoPath : `/${photoPath}`}`;
}