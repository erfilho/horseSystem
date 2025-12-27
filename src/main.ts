import { createPinia } from "pinia";
import { createApp } from "vue";

import router from "@/routes/router.ts";

import { useAuthStore } from "./stores/auth.store.ts";

import App from "./App.vue";
import "./style.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

const auth = useAuthStore();
auth.restoreSession();

app.use(router);
app.mount("#app");
