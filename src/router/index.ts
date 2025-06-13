import { createRouter, createWebHistory } from 'vue-router'
const loadComponent = (name: string) => {
    return import(`@/views/${name}.vue`);
};
const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => loadComponent("HomeView"),
    },
    {
        path: '/list',
        name: 'PokemonsCatalog',
        component: () => loadComponent("PokemonsCatalogView"),
    },

    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => loadComponent('NotFound')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Navigation Guards

export default router
