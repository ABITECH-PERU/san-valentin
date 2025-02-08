import { createRouter, createWebHistory } from 'vue-router';
import Home from './Pages/Home.vue';

const routes = [
    { path: '/', component: Home }, // Página de inicio
    { path: '/:param', component: Home, props: true }, // Capturar parámetro
    { path: '/:pathMatch(.*)*', redirect: '/' } // Rutas no encontradas
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
