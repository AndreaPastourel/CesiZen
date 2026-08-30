import { API_BASE_URL } from "@/config/api";
import { getAccessToken } from "@/services/authStorage";
import { User } from "@/types/users";

export type UpdateProfilePayload = {
  nom: string | null;
  prenom: string | null;
  pseudo: string;
  email: string;
  telephone: string | null;
  photo_profil: string | null;
};

type UpdateProfileResponse = {
  message?: string;
  data: User;
};

function isLocalImageUri(uri: string | null) {
  if (!uri) {
    return false;
  }

  return uri.startsWith("file://") || uri.startsWith("content://");
}

function createImageFileFromUri(uri: string) {
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
  } as any;
}

export async function apiUpdateUser(
  id: number,
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> {
  const token = await getAccessToken();

  const formData = new FormData();

  formData.append("nom", payload.nom ?? "");
  formData.append("prenom", payload.prenom ?? "");
  formData.append("pseudo", payload.pseudo);
  formData.append("email", payload.email);
  formData.append("telephone", payload.telephone ?? "");

  if (isLocalImageUri(payload.photo_profil)) {
    formData.append(
      "photo_profil",
      createImageFileFromUri(payload.photo_profil as string)
    );
  }

  const response = await fetch(`${API_BASE_URL}/me/update`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const text = await response.text();

  let data: any = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("Réponse API invalide.");
  }

  if (!response.ok) {
    throw new Error(data?.message || "Impossible de modifier le profil.");
  }

  return data as UpdateProfileResponse;
}