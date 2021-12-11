export default function elencoProssimeDateDiConsegna(data_da_verificare) {
  var prossimeDate = [];
  var prossimeDateFormattato = [];

  let oggi = new Date();
  let primoGiornoUtile;

  /* 0 Domenica 1 Lunedì ....... 6 sabato */
  if (oggi.getDay() == 1) primoGiornoUtile = 4;
  else if (oggi.getDay() == 2) primoGiornoUtile = 4;
  else if (oggi.getDay() == 3) primoGiornoUtile = 6;
  else if (oggi.getDay() == 4) primoGiornoUtile = 6;
  else if (oggi.getDay() == 5) primoGiornoUtile = 2;
  else if (oggi.getDay() == 6) primoGiornoUtile = 2;
  else if (oggi.getDay() == 0) primoGiornoUtile = 2;

  let contatoreInterno = 1;
  while (prossimeDate.length < 6) {
    oggi.setDate(oggi.getDate() + contatoreInterno);
    if (oggi.getDay() == primoGiornoUtile) {
      prossimeDate.push(oggi.toString());
      prossimeDateFormattato.push(
        oggi.toLocaleDateString("it", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      );
      if (primoGiornoUtile == 2) primoGiornoUtile = 4;
      else if (primoGiornoUtile == 4) primoGiornoUtile = 6;
      else if (primoGiornoUtile == 6) primoGiornoUtile = 2;
    }
  }

  if (data_da_verificare) {
    var strDataMatch;
    prossimeDate.map((element) => {
      let stringaData = new Date(element).toLocaleDateString("it", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (data_da_verificare == stringaData) {
        strDataMatch = element;
      }
    });
    if (strDataMatch) {
      return strDataMatch;
    }
    return "ERRORE riga 48 modulo funzioni-custom.js";
  }

  return prossimeDateFormattato;
}

//export default elencoProssimeDateDiConsegna();
