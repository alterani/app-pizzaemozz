<template>
  <div class="d-flex mt-2">
    <v-card id="cardTastiera" class=" ml-2" height="550" width="75%" tile>
      <v-card
        id="toolbarcard"
        height="40"
        width="100%"
        flat
        class="d-flex align-center  pl-5 "
      >
        <v-chip
          close
          class="ma-2"
          color="success"
          label
          text-color="white"
          @click:close="sommaQuantita('deleteAll')"
        >
          <v-icon left>
            mdi-label
          </v-icon>
          Mozzarella di Bufala 500g
        </v-chip>

        <v-btn
          @click="sommaQuantita('piu')"
          class="ma-2"
          outlined
          fab
          x-small
          color="success"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <input
          v-on:keyup.up="sommaQuantita('piu')"
          v-on:keyup.down="sommaQuantita('meno')"
          @keypress="validaNumero"
          class="inQuantita"
          type="text"
          v-model="quantita"
        />

        <v-btn
          @click="sommaQuantita('meno')"
          class="ma-2"
          outlined
          fab
          x-small
          color="error"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-card>
      <!--Fine toolbarcard-->

      <!-- Inizio CARD PRODTTI -->
      <template>
        <div class="d-flex flex-wrap">
          <v-card
            v-for="card in cards"
            :key="card.id"
            width="150px"
            class=" ma-2"
          >
            <v-img
              :src="card.src"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="100px"
            >
              <v-avatar
                v-if="card.label"
                width="60"
                height="20"
                tile
                color="accent"
              >
                <v-icon size="20" dark>
                  mdi-weight-kilogram
                </v-icon>
                <span class="spanLabelImmagine"> {{ card.label }}</span>
              </v-avatar>

              <v-card-title v-text="card.title"></v-card-title>
            </v-img>

            <v-btn
              @click="sommaQuantita('meno')"
              class="ma-2"
              outlined
              fab
              x-small
              color="error"
            >
              <v-icon>mdi-minus</v-icon>
            </v-btn>
            <input
              v-on:keyup.up="sommaQuantita('piu')"
              v-on:keyup.down="sommaQuantita('meno')"
              @keypress="validaNumero"
              class="inQuantita"
              type="text"
              v-model="quantita"
            />

            <v-btn
              @click="sommaQuantita('piu')"
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
    <v-card class="ml-2" height="550" width="22%" tile> </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    quantita: 0,
    provatetst: "",
    stringadavalidare: "",
    bottoneSelezionato: null,
    active: false,
    cards: [
      {
        id: "344",
        label: "",
        title: "Sacchetto",
        src: "./img/sacchetto.jpg",
      },
      {
        id: "330",
        label: "",
        title: "Pane",
        src: "./img/pane.jpeg",
      },
      {
        id: "340",
        label: "1Kg",
        title: "Provola",
        src: "./img/provola.jpg",
      },
      {
        id: "341",
        label: "",
        title: "Pastiera",
        src: "./img/pastiera.jpeg",
      },
      {
        id: "342",
        label: "500g",
        title: "Ricotta",
        src: "./img/ricotta.jpeg",
      },
      {
        id: "347",
        label: "500g",
        title: "Bocconcini",
        src: "./img/bocconcini.jpg",
      },
      {
        id: "348",
        label: "1Kg",
        title: "Zizzona",
        src: "./img/zizzona.jpeg",
      },
      {
        id: "349",
        label: "2Kg",
        title: "Treccia",
        src: "./img/treccia.jpeg",
      },
    ],
  }),
  methods: {
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
    sommaQuantita: function(operatore = "piu") {
      //console.log(operatore);
      if (operatore === "piu") {
        this.quantita -= 1;
        this.quantita += 2;
      } else if (operatore === "meno" && this.quantita > 0) {
        this.quantita -= 1;
      } else if (operatore === "deleteAll") {
        this.quantita = 0;
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

#cardTastiera {
}
#toolbarcard {
  outline: none !important;
  border-radius: 0px;
  border: 1px solid rgb(1, 5, 28, 0.1);
  border-width: 0 0 1px;
}
.spanLabelImmagine {
  font-size: 12px;
  font-weight: bold;
}
</style>
