import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true, visibilealristorante: false },
  },
  {
    path: "/nuovoordine",
    name: "NewOrder",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewOrder.vue"),
    meta: { requiresAuth: true, visibilealristorante: false },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: { requiresAuth: false, visibilealristorante: false },
  },
  {
    path: "/logout",
    name: "Logout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Logout.vue"),
    meta: { requiresAuth: true, visibilealristorante: false },
  },
  {
    path: "/ordinemozzarella",
    name: "OrdineMozzarella",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrdineMozzarella.vue"),
    meta: { requiresAuth: true, visibilealristorante: true },
  },
  {
    path: "/test",
    name: "Test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test.vue"),
    meta: { requiresAuth: true, visibilealristorante: false },
  },
  {
    path: "/test2",
    name: "Test2",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test2.vue"),
    meta: { requiresAuth: true, visibilealristorante: false },
  },
  {
    path: "/listaordini",
    name: "Listaordini",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Listaordini.vue"),
    meta: { requiresAuth: true, visibilealristorante: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  const isLogged = firebase.auth().currentUser;

  if (requiresAuth && !isLogged) {
    next("/login");
  } else if (
    /* to.meta.visibilealristorante && */
    to.path != "/login" &&
    to.path != "/logout" &&
    requiresAuth
  ) {
    controllaAccesso(to).then((res) => {
      if (res) {
        next();
      } else {
        next("/login");
      }
    });
  } else {
    next();
  }
});

async function controllaAccesso(to) {
  let indirizzoMail;
  let valoreDaRitornare;
  if (firebase.auth().currentUser) {
    indirizzoMail = firebase.auth().currentUser.email;
  }
  let utenteConProfiloRistorante = false;
  //se sono io passa il controllo
  if (indirizzoMail == "e.alterani@gmail.com") return true;
  // se non è richiesto controllo ristorante passa il controllo

  await firebase
    .firestore()
    .collection("permessi")
    .where("utente", "==", indirizzoMail)
    .get()
    .then((queruSanpshot) => {
      queruSanpshot.forEach((doc) => {
        utenteConProfiloRistorante = doc.data().ristorante;
      });
      if (utenteConProfiloRistorante && to.meta.visibilealristorante) {
        valoreDaRitornare = true;
      } else {
        valoreDaRitornare = false;
      }
    });

  return valoreDaRitornare;
}

export default router;
