<template>
  <div class="d-flex mt-2">
    <v-card id="cardTastiera" class=" ml-2" height="550" width="65%" tile>
      <v-card
        id="toolbarcard"
        color="secondary"
        height="40"
        width="100%"
        flat
        class="d-flex align-center  pl-5 toolbarcard"
      >
        <h3>Nuova Prenotazione</h3>
      </v-card>
      <!--Fine toolbarcard-->

      <!-- Inizio CARD PRODTTI -->
      <template>
        <div class="cardProdotti d-flex flex-wrap">
          <v-card
            v-for="card in cards"
            :key="card.id"
            width="150px"
            height="150px"
            class=" ma-2"
          >
            <v-img
              :src="card.src"
              class="white--text align-end imgProdotto"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100px"
              @click="sommaQuantita('piu', card)"
            >
              <v-avatar
                v-if="card.label || card.qtn"
                width="60"
                height="30"
                tile
                :color="cambiacolore(card.qtn)"
              >
                <span v-if="card.label && card.qtn" class="spanLabelImmagine">
                  {{ card.qtn + " x " + card.label }}
                </span>
                <span v-else-if="card.label" class="spanLabelImmagine">
                  {{ card.label }}
                </span>
                <span v-else-if="card.qtn" class="spanLabelImmagine">
                  {{ card.qtn + " pz." }}
                </span>
              </v-avatar>

              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-btn
              @click="sommaQuantita('meno', card)"
              class="ma-2"
              outlined
              fab
              x-small
              color="error"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <input
              v-on:keyup.up="sommaQuantita('piu', card)"
              v-on:keyup.down="sommaQuantita('meno', card)"
              @keypress="validaNumero"
              class="inQuantita"
              type="text"
              v-model="card.qtn"
            />

            <v-btn
              @click="sommaQuantita('piu', card)"
              class="ma-2"
              outlined
              fab
              x-small
              color="success"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card>
        </div>
      </template>
      <!-- fineCARD PRODTTI-->
    </v-card>
    <!-- Fine card numero 1-->
    <v-card class="ml-2" height="550" width="32%" tile>
      <!--inizio toolbar list-->
      <v-card
        id="toolbarlista"
        height="40"
        width="100%"
        flat
        class="d-flex align-center toolbarcard"
        color="secondary"
      >
        <h3 class="pl-5">Dettagli Ordine</h3>
      </v-card>
      <!--fine toolbar lista-->
      <!-- Inizio lista -->
      <v-list>
        <template v-for="item in cards">
          <v-list-item
            v-if="item.qtn"
            v-bind:class="{ quantOrdinata: item.qtn }"
            @click="sommaQuantita('piu', item)"
            :key="'B' + item.id"
          >
            <v-avatar size="28" color="primary">
              <span class="spanLabelLista white--text">
                {{ item.qtn }}
              </span>
            </v-avatar>

            <v-list-item-content class="pl-5">
              <v-list-item-title
                v-bind:class="{ 'font-weight-bold': item.qtn }"
                v-html="item.title + ' ' + item.label"
              ></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon
                v-if="item.qtn"
                color="#B00020"
                small
                @click="cancellOrdine(item)"
              >
                mdi-bookmark-remove
              </v-icon>
            </v-list-item-action>
          </v-list-item>
          <v-divider v-if="item.qtn" :key="item.id"></v-divider>
        </template>
      </v-list>

      <!-- Fine lista -->

      <!-- inizio Form -->
      <v-form
        :disabled="!cardSelezionate.length > 0"
        ref="form"
        lazy-validation
        class="formOrdine"
      >
        <v-text-field
          class="textInputOrdine"
          v-model="nomeCliente"
          label="Nome"
          required
        ></v-text-field>

        <v-text-field
          class="textInputOrdine"
          v-model="telefonoCliente"
          label="Telefono"
          required
        ></v-text-field>

        <v-select
          class="textInputOrdine"
          v-model="select"
          :items="elencoDate"
          :rules="[(v) => !!v || 'Inserisci Data']"
          label="Data consegna"
          required
          ref="selectDate"
        ></v-select>

        <v-btn
          :disabled="
            !select ||
              !nomeCliente ||
              !telefonoCliente ||
              !cardSelezionate.length > 0
          "
          color="success"
          class="mr-4 mt-5"
          @click="inviaOrdine"
        >
          INVIA ORDINE
        </v-btn>
      </v-form>
      <!--Fine form -->

      <!-- INIZIO SNACkBAR-->
      <v-snackbar
        vertical
        centered
        color="success"
        v-model="snackbar"
        :timeout="timeout"
      >
        <h3 class="white--text">Ordine trasmesso correttamente!</h3>

        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
            Chiudi
          </v-btn>
        </template>
      </v-snackbar>
      <!-- FINE SNACKBAR -->
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    snackbar: false,
    timeout: 3000,
    nomeCliente: "",
    telefonoCliente: "",
    quantita: 0,
    provatetst: "",
    stringadavalidare: "",
    bottoneSelezionato: null,
    active: false,
    select: null,
    elencoDate: [
      "02-Febbraio Martedi",
      "04-Febbraio Giovedi",
      "06-Febbraio Sabato",
      "09-Febbraio Martedi",
    ],
    cards: [
      {
        id: "100",
        label: "",
        title: "Sacchetto",
        src: "./img/sacchetto.jpg",
        qtn: 0,
      },
      {
        id: "110",
        label: "",
        title: "Pane",
        src: "./img/pane.jpeg",
        qtn: 0,
      },
      {
        id: "120",
        label: "",
        title: "Pastiera",
        src: "./img/pastiera.jpeg",
        qtn: 0,
      },
      {
        id: "130",
        label: "",
        title: "Pomodoro",
        src: "./img/solania.png",
        qtn: 0,
      },
      {
        id: "400",
        label: "500g",
        title: "Zizzona",
        src: "./img/zizzona.jpeg",
        qtn: 0,
      },
      {
        id: "410",
        label: "1Kg",
        title: "Zizzona",
        src: "./img/zizzona.jpeg",
        qtn: 0,
      },
      {
        id: "420",
        label: "2Kg",
        title: "Zizzona",
        src: "./img/zizzona.jpeg",
        qtn: 0,
      },
      {
        id: "430",
        label: "5Kg",
        title: "Zizzona",
        src: "./img/zizzona.jpeg",
        qtn: 0,
      },
      {
        id: "200",
        label: "500g",
        title: "Provola",
        src: "./img/provola.jpg",
        qtn: 0,
      },
      {
        id: "210",
        label: "1Kg",
        title: "Provola",
        src: "./img/provola.jpg",
        qtn: 0,
      },
      {
        id: "220",
        label: "2Kg",
        title: "Provola",
        src: "./img/provola.jpg",
        qtn: 0,
      },
      {
        id: "230",
        label: "5Kg",
        title: "Provola",
        src: "./img/provola.jpg",
        qtn: 0,
      },
      {
        id: "500",
        label: "1Kg",
        title: "Treccia",
        src: "./img/treccia.jpeg",
        qtn: 0,
      },
      {
        id: "510",
        label: "2Kg",
        title: "Treccia",
        src: "./img/treccia.jpeg",
        qtn: 0,
      },
      {
        id: "520",
        label: "2Kg",
        title: "Treccia",
        src: "./img/treccia.jpeg",
        qtn: 0,
      },
      {
        id: "530",
        label: "2Kg",
        title: "Treccia",
        src: "./img/treccia.jpeg",
        qtn: 0,
      },

      {
        id: "300",
        label: "500g",
        title: "Bocconcini",
        src: "./img/bocconcini.jpg",
        qtn: 0,
      },
      {
        id: "310",
        label: "1Kg",
        title: "Bocconcini",
        src: "./img/bocconcini.jpg",
        qtn: 0,
      },
      {
        id: "320",
        label: "2Kg",
        title: "Bocconcini",
        src: "./img/bocconcini.jpg",
        qtn: 0,
      },
      {
        id: "330",
        label: "5Kg",
        title: "Bocconcini",
        src: "./img/bocconcini.jpg",
        qtn: 0,
      },

      {
        id: "342",
        label: "500g",
        title: "Ricotta",
        src: "./img/ricotta.jpeg",
        qtn: 0,
      },
    ],
  }),
  computed: {
    cardSelezionate: function() {
      return this.filtraQuantita();
    },
  },
  methods: {
    resetOrdine: function() {
      this.cards.forEach(function(singolaCard) {
        singolaCard.qtn = 0;
      });
      this.nomeCliente = "";
      this.telefonoCliente = "";
      this.select = null;
      this.$refs["selectDate"].reset();
    },
    filtraQuantita: function() {
      return this.cards.filter(function(card) {
        return card.qtn > 0;
      });
    },
    inviaOrdine: function() {
      this.snackbar = true;
      console.log("\n..........................");
      console.log("Nome : " + this.nomeCliente);
      console.log("Telefono : " + this.telefonoCliente);
      console.log("Data Consegna : " + this.select);
      console.log("----------------------------------");
      console.log("Quantita" + "\t" + "Prodotto ");
      this.cardSelezionate.map(function(singol) {
        console.log(singol.qtn + "\t\t\t" + singol.title + " " + singol.label);
      });
      console.log("----------------------------------");
      this.resetOrdine();
    },
    cambiacolore: function(parametro) {
      if (parametro) {
        return "secondary";
      }
      return "accent";
    },
    cancellOrdine: function(item) {
      item.qtn = -1;
    },
    selezionaProdotto: function(e) {
      this.bottoneSelezionato = e;
    },
    validaNumero: function(e) {
      if (
        !(e.code == "Digit0") &&
        !(e.code == "Digit1") &&
        !(e.code == "Digit2") &&
        !(e.code == "Digit3") &&
        !(e.code == "Digit4") &&
        !(e.code == "Digit5") &&
        !(e.code == "Digit6") &&
        !(e.code == "Digit7") &&
        !(e.code == "Digit8") &&
        !(e.code == "Digit9")
      ) {
        e.preventDefault();
      }
    },
    sommaQuantita: function(operatore = "piu", scheda) {
      //console.log(scheda.qtn);
      if (operatore === "piu") {
        scheda.qtn -= 1;
        scheda.qtn += 2;
      } else if (operatore === "meno" && scheda.qtn > 0) {
        scheda.qtn -= 1;
      } else if (operatore === "deleteAll") {
        scheda.qtn = 0;
      }
    },
  },
  watch: {
    quantita: function(newQuantita, oldQuantita) {
      //console.log("newQuantita = " + newQuantita);
    },
  },
};
</script>
<style scoped>
#nomeprodotto {
  width: 350px;
  border-style: none;
  background-color: rgb(151, 221, 151);
  border-color: blue;
  border-radius: 15px;
  text-align: center;
  font-weight: bold;
}

.inQuantita {
  width: 47px;
  height: 30px;
  text-align: center;
  font-weight: 500;
  border: 1px solid grey;
  border-width: 1px;
  border-radius: 10px;
}
.inQuantita:focus {
  outline: none !important;
  border-radius: 0px;
  border: 1px solid grey;
  border-width: 0 0 1px;
}

.toolbarcard {
  outline: none !important;
  border-radius: 0px;
  border: 1px solid rgb(1, 5, 28, 0.1);
  border-width: 0 0 1px;
}
.spanLabelImmagine {
  font-size: 15px;
  font-weight: bold;
}
.spanLabelLista {
  font-size: 18px;
  font-weight: bold;
}
.cardProdotti {
  height: 510px;
  overflow: scroll;
  overflow-x: hidden;
}
.imgProdotto {
  cursor: pointer;
}
.formOrdine {
  padding: 2px;
  margin: 10px;
  padding-top: 4px;

  height: 200px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(123, 123, 123);
  border-radius: 10px;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}
.textInputOrdine {
  border-style: none;
  border-color: red;
  padding-top: 0px;
  padding-bottom: 0px;
  height: 40px;
  font-weight: bold;
}
</style>
