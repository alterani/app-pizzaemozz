import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase/app";
import "firebase/auth";
import axios from "axios";
import firebaseConfig from "./configFirebase.js";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

console.log("configFirebase = ", firebaseConfig);

firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    //console.log("ci sono passato");
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
