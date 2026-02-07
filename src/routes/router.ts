import { useAuthStore } from "@/stores/auth.store";

import Home from "@/views/Home.vue";
import HorsesDashboard from "@/views/HorsesDashboard.vue";
import Login from "@/views/Login.vue";
import MyBets from "@/views/MyBets.vue";
import NotFound from "@/views/NotFound.vue";
import Profile from "@/views/Profile.vue";
import RacesDashboard from "@/views/RacesDashboard.vue";
import Register from "@/views/Register.vue";
import Results from "@/views/Results.vue";
import Wallet from "@/views/Wallet.vue";

import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/user/wallet",
    name: "wallet",
    component: Wallet,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/my-bets",
    name: "my-bets",
    component: MyBets,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/results",
    name: "results",
    component: Results,
    meta: { requiresAuth: true },
  },
  {
    path: "/user/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/dashboard/races",
    name: "races",
    component: RacesDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin/dashboard/horses",
    name: "horsesDashboard",
    component: HorsesDashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/:catchAll(.*)*",
    name: "404-not-found",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return "/login";
  }

  if (
    (to.path === "/login" || to.path === "/register") &&
    auth.isAuthenticated
  ) {
    return "/profile";
  }
});

export default router;
