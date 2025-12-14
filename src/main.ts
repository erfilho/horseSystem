import { createApp } from "vue";
import CountryFlag from "vue-country-flag-next";
import App from "./App.vue";
import "./style.css";

const app = createApp(App);

app.component("CountryFlag", CountryFlag);

app.mount("#app");
