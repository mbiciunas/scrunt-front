import 'vuetify/styles' // Global CSS has to be imported
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {createVuetify} from "vuetify";
import App from './App.vue'
import router from './router/index'
import { loadFonts } from './plugins/webfontloader'
import '@mdi/font/css/materialdesignicons.css'

loadFonts()

const vuetify = createVuetify({
    theme: {
        // defaultTheme: 'myCustomLightTheme'
        defaultTheme: 'light'
    }
})

createApp(App)
    .use(router)
    .use(vuetify)
    .use(createPinia())
    .mount('#app')

