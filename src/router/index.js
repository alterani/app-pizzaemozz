import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/nuovoordine",
    name: "NewOrder",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewOrder.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/logout",
    name: "Logout",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Logout.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/ordinemozzarella",
    name: "OrdineMozzarella",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrdineMozzarella.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/test",
    name: "Test",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/test2",
    name: "Test2",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Test2.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/listaordini",
    name: "Listaordini",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Listaordini.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(
    (record) => record.meta.requiresAuth
    //console.log(record.meta.requiresAuth);
  );
  const isLogged = firebase.auth().currentUser;

  //console.log("isLogged ", isLogged, "requiresAuth ", requiresAuth);

  if (requiresAuth && !isLogged) {
    next("/login");
  } else {
    next();
  }
});

export default router;
