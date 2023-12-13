import { createRouter, createWebHistory } from 'vue-router'
import inicioView from '../views/inicioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: inicioView
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/inicioView.vue')
    },
    {
      path: '/facturar',
      name: 'facturar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/inicioView.vue')
    },
    {
      path: '/ajustes',
      name: 'ajustes',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/inicioView.vue')
    }
  ]
})

export default router
