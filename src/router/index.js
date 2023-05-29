import { createRouter, createWebHistory } from 'vue-router'
import resumenView from '../views/resumenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'resumen',
      component: resumenView
    },
    {
      path: '/estadisticas',
      name: 'estadisticas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/estadisticasView.vue')
    },
    {
      path: '/facturar',
      name: 'facturar',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/facturarView.vue')
    }
  ]
})

export default router
