import { createApp } from "vue";
import InstantSearch from "vue-instantsearch/dist/vue3/es";
import App from "./App.vue";

const app = createApp(App);
app.use(InstantSearch);
app.mount("#app");
