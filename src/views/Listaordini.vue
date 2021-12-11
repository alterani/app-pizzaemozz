<template>
  <div class="about">
    <h1>Pagina Lista Ordini</h1>
    <v-btn color="success" class="bottoni mr-4 mt-5" @click="leggiOrdini">
      <v-icon>
        mdi-refresh
      </v-icon>
      Ordini
    </v-btn>

    <v-expansion-panels focusable>
      <v-expansion-panel
        v-for="singoloOrdine in listaOrdini"
        :key="singoloOrdine.id"
      >
        <v-expansion-panel-header>
          <h3>
            <v-icon
              color="green darken-2"
              :disabled="!singoloOrdine.ordine.ordinetrasmessoalcaseificio"
            >
              mdi-truck
            </v-icon>
            <v-icon
              color="green darken-2"
              :disabled="!singoloOrdine.ordine.consegnatoalcliente"
            >
              mdi-label
            </v-icon>
            {{ singoloOrdine.ordine.nomeCliente }}
          </h3>
          {{ formattaData(singoloOrdine.ordine.dataConsegna) }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p>
            Telefono:
            <span class="font-weight-black"
              >{{ singoloOrdine.ordine.telefonoCliente }}
            </span>
          </p>
          <span class="font-weight-black">Dettaglio Ordine </span>
          <br />
          <span
            v-for="rigaordine in singoloOrdine.ordine.righeordine"
            :key="rigaordine.descrizioneProdotto"
            class="font-weight-medium"
          >
            - {{ rigaordine.quantita }} {{ rigaordine.descrizioneProdotto }}
            <br
          /></span>
          <v-row justify="end">
            <v-btn
              class="bottoni"
              tile
              color="success"
              :disabled="singoloOrdine.ordine.consegnatoalcliente"
              @click="consegnaOrdine(singoloOrdine)"
            >
              <v-icon left>
                mdi-hand-extended
              </v-icon>
              Consegna al cliente
            </v-btn>
            <v-btn
              class="bottoni"
              tile
              color="error"
              :disabled="
                singoloOrdine.ordine.consegnatoalcliente ||
                  singoloOrdine.ordine.ordinetrasmessoalcaseificio
              "
              @click="cancellaOrdine(singoloOrdine)"
            >
              <v-icon left>
                mdi-delete
              </v-icon>
              Cancella Ordine
            </v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data: () => ({
    listaOrdini: [],
  }),
  methods: {
    formattaData: function(voloreTimeStamp) {
      let questData = new Date(voloreTimeStamp.toDate());
      let stringaData = questData.toLocaleDateString("it", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      return stringaData;
    }, // fine formattaData
    leggiOrdini: function() {
      var elencomio = [];
      const ordini = firebase
        .firestore()
        .collection("Ordini")
        .orderBy("dataConsegna")
        .get()
        .then((queruSanpshot) => {
          this.listaOrdini = [];
          queruSanpshot.forEach((doc) => {
            //console.log(doc.id);
            //console.log(doc.data());
            elencomio.push({ id: doc.id, ordine: doc.data() });
            this.listaOrdini.push({ id: doc.id, ordine: doc.data() });
          });
        });
      //this.listaOrdini = elencomio;
      //console.log(this.listaOrdini);
    }, // fine funzione leggi ordini
    consegnaOrdine: function(ordinedamodificare) {
      //.where("id", "==", ordinedamodificare.id)
      firebase
        .firestore()
        .collection("Ordini")
        .doc(ordinedamodificare.id)
        .update({ consegnatoalcliente: true })
        .then((res) => {
          //console.log("Forse hai modificato l'ordine " + ordinedamodificare.id);
          this.leggiOrdini();
        });
    }, // dine consegnaOrdine
    cancellaOrdine: function(ordinedacancellare) {
      //console.log("vorresti Cancellare l'ordine " + ordinedacancellare.id);
      firebase
        .firestore()
        .collection("Ordini")
        .doc(ordinedacancellare.id)
        .delete()
        .then((res) => {
          //console.log("Forse hai cancellato l'ordine " + ordinedacancellare.id);
          this.leggiOrdini();
        });
    },
  }, // fine methods
}; //fine export default
</script>
<style scoped>
.bottoni {
  margin: 10px;
}
</style>
