import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import vuetify from './plugins/vuetity.ts';
import App from './App.vue';
const pinia = createPinia();
const app = createApp( App );
import 'animate.css';
app.use( createPinia() );
app.use( router );
app.use(pinia);
app.use( vuetify );

app.mount( '#app' );
