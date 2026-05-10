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