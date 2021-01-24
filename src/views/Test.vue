<template>
  <div>
    <v-card max-width="450" class="mx-auto">
      <v-toolbar color="primary" dark>
        <v-spacer></v-spacer>
        <v-toolbar-title>Scheda prenotazione</v-toolbar-title>

        <v-spacer></v-spacer>
      </v-toolbar>

      <v-list>
        <template v-for="(item, index) in items">
          <v-subheader
            v-if="item.header"
            :key="item.header"
            v-text="item.header"
          ></v-subheader>

          <v-divider
            v-else-if="item.divider"
            :key="index"
            :inset="item.inset"
          ></v-divider>

          <v-list-item
            v-bind:class="{ quantOrdinata: item.quantita }"
            @click="selezioneProdotto(item)"
            v-else
            :key="item.title"
          >
            <v-badge
              :content="item.quantita + ' Pz'"
              :value="item.quantita"
              color="secondary"
              left
              overlap
              ><v-list-item-avatar>
                <v-icon v-if="item.quantita" color="black">
                  mdi-book-open</v-icon
                >
                <v-icon v-else> mdi-book-open</v-icon>
                <!-- <v-img :src="item.avatar"></v-img> -->
              </v-list-item-avatar>
            </v-badge>

            <v-list-item-content>
              <v-list-item-title
                v-bind:class="{ 'font-weight-bold': item.quantita }"
                v-html="item.title"
              ></v-list-item-title>
              <!--
            <v-list-item-subtitle
              v-bind:class="{ 'font-weight-bold': item.quantita }"
              v-html="item.subtitle"
            ></v-list-item-subtitle> -->
            </v-list-item-content>

            <v-list-item-action>
              <v-icon
                v-if="item.quantita"
                color="#B00020"
                small
                @click="cancellOrdine(item)"
              >
                mdi-bookmark-remove
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </v-card>

    <v-card class="mx-auto" max-width="400">
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">
            San Francisco
          </v-list-item-title>
          <v-list-item-subtitle
            >Mon, 12:30 PM, Mostly sunny</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3" cols="6">
            23&deg;C
          </v-col>
          <v-col cols="6">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sun.png"
              alt="Sunny image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>23 km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>48%</v-list-item-subtitle>
      </v-list-item>

      <v-slider
        v-model="time"
        :max="6"
        :tick-labels="labels"
        class="mx-4"
        ticks
      ></v-slider>

      <v-list class="transparent">
        <v-list-item v-for="item in forecast" :key="item.day">
          <v-list-item-title>{{ item.day }}</v-list-item-title>

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-subtitle class="text-right">
            {{ item.temp }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn text>
          Full Report
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
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
<style scoped>
.quantOrdinata {
  /* background: #cbf0e5;*/
}
</style>
