export default function formatDate(date: string | null) {
    if (!date) {
      return "Date non renseignée";
    }

    return new Date(date).toLocaleDateString("fr-FR");
  }