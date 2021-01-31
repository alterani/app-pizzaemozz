<template>
  <h1>{{ erroreCatch }}</h1>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  created: function() {
    this.faiLogout();
  },
  data: () => ({
    erroreCatch: "",
  }),
  methods: {
    faiLogout: async function() {
      try {
        const dati = await firebase.auth().signOut();
        //console.log("logout");
        this.$router.replace({ name: "Login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped></style>
