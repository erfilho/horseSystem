import { createPinia } from "pinia";
import { createApp } from "vue";

import piniaPersist from "pinia-plugin-persistedstate";

import router from "@/routes/router.ts";

import { useAuthStore } from "./stores/auth.store.ts";

import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPersist);

app.use(pinia);

const auth = useAuthStore();
auth.restoreSession();

app.use(router);
app.mount("#app");
