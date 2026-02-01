import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import authLayout from "./layout/auth.vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  //.component("main-layout", mainLayout)
  .component("auth", authLayout)
  .use(Toast)
  .mount("#app");
