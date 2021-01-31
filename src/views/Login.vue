<template>
  <div class="formLogin d-flex flex-column align-center justify-center">
    <v-card
      height="300"
      width="300"
      class=" d-flex  flex-column justify-center align-center"
    >
      <h2>Entra</h2>

      <v-text-field
        v-model="mail"
        class="textInput"
        label="mail"
        full-width
      ></v-text-field>
      <v-text-field
        v-model="password"
        class="textInput"
        label="password"
        full-width
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="show1 = !show1"
        :type="show1 ? 'text' : 'password'"
      ></v-text-field>
      <v-btn @click="login" elevation="2" block height="10" color="secondary"
        >Login</v-btn
      >
    </v-card>
    <div class="ma-5 d-flex flex-column " v-if="logErrore.codice">
      <h4 class="red--text">Codice Errore: {{ logErrore.codice }}</h4>
      <h4 class="red--text">Messaggio Errore: {{ logErrore.messaggio }}</h4>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data: () => ({
    mail: "",
    password: "",
    show1: false,
    logErrore: {
      codice: "",
      messaggio: "",
    },
  }),
  methods: {
    login: function() {
      this.logErrore.codice = "";
      this.logErrore.messaggio = "";
      console.log(process.env.VUE_APP_FIREBASE_CONFIG_KEY);

      firebase
        .auth()
        .signInWithEmailAndPassword(this.mail, this.password)
        .then(
          (user) => {
            //console.log(user);
            //console.log(firebase.auth().currentUser.email);
            //reset form Login
            this.mail = "";
            this.password = "";
            this.$router.replace({ name: "OrdineMozzarella" });
          },
          (errore) => {
            this.logErrore.codice = errore.code;
            this.logErrore.messaggio = errore.message;
            console.log(errore);
          }
        );
    },
  },
};
</script>
<style scoped>
.formLogin {
  height: 100%;
  width: 100%;
  margin-left: 0px;
  padding-left: 0px;
}
.textInput {
  margin-left: 0px;
  padding-left: 8px;
  padding-right: 8px;
  padding-bottom: 0px;
  margin-bottom: 0px;
  width: 100%;
  height: 30px;
}
</style>
