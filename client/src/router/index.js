import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";
import LandingLayout from "../layouts/LandingView.vue";
import ExploreView from "../layouts/ExplortView.vue";

import AccountView from "../views/Explore/AccountView.vue";
import HomeView from "../views/Explore/HomeView.vue";
import ProductView from "../views/Explore/ProductView.vue"
import AboutView from "../views/Explore/AboutView.vue"

import RegisterView from "../views/Landing/RegisterView.vue";
import LoginView from "../views/Landing/LoginView.vue";
import IndexView from "../views/Landing/IndexView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingLayout,
    children: [
      {
        path: "",
        name: "index",
        component: IndexView,
      },
      {
        path: "register",
        name: "Register",
        component: RegisterView,
      },
      {
        path: "login",
        name: "Login",
        component: LoginView,
      },
    ],
    beforeEnter: (to, from, next) => {
      if (Cookies.get("token")) {
        window.location.href = "/explore";
      } else {
        next();
      }
    },
  },
  {
    path: "/explore",
    name: "Explore",
    component: ExploreView,
    children: [
      {
        path: "",
        name: "Home",
        component: HomeView,
      },
      {
        path: 'account',
        name: "Account",
        component: AccountView
      },
      {
        path: "product",
        name: "Product",
        component: ProductView,
      },
      {
        path: "about",
        name: "About",
        component: AboutView,
      }
    ],
    beforeEnter: (to, from, next) => {
      if (!Cookies.get("token")) {
        window.location.href = "/login";
      } else {
        next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
