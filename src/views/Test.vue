<template>
  <div>
    <v-btn @click="stampaLog">Stampa Log</v-btn>
    <v-card max-width="450" class="mx-auto">
      <v-toolbar color="primary" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>Scheda prenotazione</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card>
    <v-btn @click="addRecord">INSERT DATI</v-btn>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export default {
  data: () => ({
    dattto: 0,
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Sacchetto 300g.",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Provola 500g",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Zizzona 500g",
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Zizzona 1kg",
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Zizzona 2kg",
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Treccia 500g",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Treccia 1Kg",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Treccia 2Kgg",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        quantita: 0,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Bocconcini 500g",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        quantita: 0,
      },
    ],
  }),
  methods: {
    addRecord: function() {
      firebase
        .firestore()
        .collection("Ordini")
        .add({
          nomeclient: "Enrico5",
          prodotti: {
            data: new Date(),
            mozzarella: Math.trunc(Math.random() * 100),
            pane: Math.trunc(Math.random() * 100),
            creatoDa: firebase.auth().currentUser.uid,
          },
        });
      alert("call addRecod");
    },
    stampaLog: function name(params) {
      console.log(this.$vuetify.breakpoint);
    },
    selezioneProdotto: function(item) {
      if (!item.quantita) {
        item.quantita = 0;
      }

      item.quantita += 1;
    },
    cancella: function() {
      console.log("funzione cancella");
    },
    cancellOrdine: function(item) {
      item.quantita = -1;
    },
  },
};
</script>
<style scoped></style>
