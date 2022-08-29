import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue"
import Script from "@/views/Script.vue"
import Service from "@/views/Service.vue"
import Credential from "@/views/Credential.vue"

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/script', name: 'Script', component: Script},
    {path: '/service', name: 'Service', component: Service},
    {path: '/credential', name: 'Credential', component: Credential},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;