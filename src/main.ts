import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import vuetify from './plugins/vuetity.ts';
import App from './App.vue';

const app = createApp( App );

app.use( createPinia() );
app.use( router );
app.use( vuetify );

app.mount( '#app' );
