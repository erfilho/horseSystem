import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import MainView from "../views/mainView.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainView,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "text-slate-300",
  linkExactActiveClass: "text-slate-300",
});
