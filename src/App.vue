<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="loggedIn" v-model="drawer" app class="primary">
      <v-list-item class="primary">
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Pizza&Mozz
          </v-list-item-title>
          <v-list-item-subtitle class="grey--text">
            {{ maillUser }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <div v-for="item in items" :key="item.title">
          <v-list-item
            active-class="sonoattivo"
            class="enritostile"
            color="white"
            :to="item.to"
            link
            v-if="
              item.visibileatutti ||
                (loggedIn &&
                  (item.comletatoSviluppo ||
                    (item.visibilealRistorante && profiloRistorante) ||
                    maillUser == 'e.alterani@gmail.com'))
            "
          >
            <v-list-item-icon>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="white--text">{{
                item.title
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-divider
          v-if="loggedIn && maillUser == 'e.alterani@gmail.com'"
        ></v-divider>

        <v-list-item
          active-class="sonoattivo"
          class="enritostile"
          color="white"
          :to="test.to"
          link
          v-if="loggedIn && maillUser == 'e.alterani@gmail.com'"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ test.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              test.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          active-class="sonoattivo"
          class="enritostile"
          color="white"
          :to="test2.to"
          link
          v-if="loggedIn && maillUser == 'e.alterani@gmail.com'"
        >
          <v-list-item-icon>
            <v-icon class="white--text">{{ test2.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="white--text">{{
              test2.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="primary white--text">
      <v-app-bar-nav-icon
        class="white--text enritostile"
        @click="drawer = !drawer"
        v-if="loggedIn"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>Pizza e Mozzarella</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.maillUser = firebase.auth().currentUser.email;
        firebase.auth().currentUser.metadata;
        this.loggedIn = true;

        firebase
          .firestore()
          .collection("permessi")
          .where("utente", "==", this.maillUser)
          .get()
          .then((queruSanpshot) => {
            queruSanpshot.forEach((doc) => {
              //console.log(doc.data());
              this.profiloRistorante = doc.data().ristorante;
            });
          });
      } else {
        this.maillUser = "";
        this.loggedIn = false;
      }
    });
  }, // fine created
  data: () => ({
    maillUser: "",
    profiloRistorante: "",
    loggedIn: false,
    drawer: null,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        to: "/",
        visibileatutti: false,
        comletatoSviluppo: false,
        visibilealRistorante: false,
      },
      {
        title: "Prenota Mozzarella",
        icon: "mdi-map-clock",
        to: "/ordinemozzarella",
        visibileatutti: false,
        comletatoSviluppo: false,
        visibilealRistorante: true,
      },

      {
        title: "Vedi ordini",
        icon: "mdi-order-alphabetical-ascending",
        to: "/listaordini",
        protetto: false,
        comletatoSviluppo: false,
        visibilealRistorante: true,
      },
      {
        title: "Fai un ordine",
        icon: "mdi-book-plus-multiple-outline",
        to: "/nuovoordine",
        protetto: false,
        comletatoSviluppo: false,
        visibilealRistorante: false,
      },
      {
        title: "Esci",
        icon: "mdi-logout",
        to: "/logout",
        protetto: false,
        comletatoSviluppo: true,
        visibilealRistorante: false,
      },
    ],
    test: { title: "TEST-Sviluppo", icon: "mdi-dev-to", to: "/test" },
    test2: { title: "TEST-Sviluppo2", icon: "mdi-dev-to", to: "/test2" },
  }),
};
</script>

<style scoped>
.enritostile:hover {
  background: #232f34;
}
.sonoattivo {
  background: #f9aa33;
}
#inspire {
  background: #f1f7f9;
}
</style>
