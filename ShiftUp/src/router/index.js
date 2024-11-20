import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: () => import('../views/SpeakersView.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView.vue'),
    },
    {
      path: '/ticket',
      name: 'ticket',
      component: () => import('../views/TicketView.vue'),
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: () => import('../views/SpeakersView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404Page',
      component: () => import('../views/NotFound.Vue'),
    },
  ],
})

export default router
