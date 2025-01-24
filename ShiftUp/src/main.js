import "./assets/tailwind.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
