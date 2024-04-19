import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createPinia } from 'pinia';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { useLoggedInUserStore } from './store/loggedInUser'; // Corrected import statement

const app = createApp(App);

// Initialize Pinia and add it to the app
const pinia = createPinia();
app.use(pinia);

// Initialize and configure Toast notifications
const toastOptions = {
  position: 'bottom-right'
};
app.use(Toast, toastOptions);

// Register global components
app.component('VueDatePicker', VueDatePicker);

// Use the router with the app
app.use(router);

app.mount("#app");

// After the app is mounted, then check the login state using Pinia store
const loggedInUserStore = useLoggedInUserStore();
loggedInUserStore.checkLogin();
