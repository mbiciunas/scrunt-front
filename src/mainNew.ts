import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createVuetify} from "vuetify";
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

// const app = createApp(App)
const vuetify = createVuetify({
    theme: {
        // defaultTheme: 'myCustomLightTheme'
        defaultTheme: 'light'
    }
})

// app.use(vuetify)
createApp(App)
  .use(vuetify)
  .use(createPinia())
  .mount('#app')

