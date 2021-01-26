<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="primary">
      <v-list-item class="primary">
        <v-list-item-content>
          <v-list-item-title class="title white--text">
            Pizza&Mozz
          </v-list-item-title>
          <v-list-item-subtitle class="grey--text">
            Amministratore
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          active-class="sonoattivo"
          class="enritostile"
          color="white"
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
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

        <v-divider></v-divider>

        <v-list-item
          active-class="sonoattivo"
          class="enritostile"
          color="white"
          :to="test.to"
          link
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
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
      {
        title: "Prenota Mozzarella",
        icon: "mdi-map-clock",
        to: "/ordinemozzarella",
      },
      {
        title: "Vedi ordini",
        icon: "mdi-order-alphabetical-ascending",
        to: "/listaordini",
      },
      {
        title: "Fai un ordine",
        icon: "mdi-book-plus-multiple-outline",
        to: "/nuovoordine",
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
