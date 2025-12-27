import { useAuthStore } from "@/stores/auth.store";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
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
    path: "/wallet",
    name: "wallet",
    component: Wallet,
  },
  {
    path: "/my-bets",
    name: "my-bets",
    component: Wallet,
  },
  {
    path: "/results",
    name: "results",
    component: Results,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
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
