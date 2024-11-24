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
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/TicketView.vue'),
    },
    {
      path: '/speakers',
      name: 'speakers',
      component: () => import('../views/SpeakersView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginRegisterView.vue'),
    },
    //Admin Routes
    {
      path: '/admin/:id',
      name: 'dashboard',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/AdminView.vue'),
    },
    {
      path: '/admin/:id/communication',
      name: 'communicationAdmin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/CommunicationView.vue'),
    },
    {
      path: '/admin/:id/speakers',
      name: 'speakersAdmin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/SpeakersView.vue'),
    },
    {
      path: '/admin/:id/orders',
      name: 'ordersAdmin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/OrdersView.vue'),
    },
    {
      path: '/admin/:id/participants',
      name: 'participantsAdmin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/ParticipantsView.vue'),
    },
    {
      path: '/admin/:id/products',
      name: 'productsAdmin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/ProductsView.vue'),
    },
    {
      path: '/admin/:id/volunteers',
      name: 'volunteersAdmin',
      meta: { requiresAuth: true },
      component: () => import('../views/Admin/VolunteersView.vue'),
    },
    //Participante Routes
    {
      path: '/participante/:id',
      name: 'participante',
      meta: { requiresAuth: true },
      component: () => import('../views/Participante/ParticipanteView.vue'),
    },
    {
      path: '/participante/:id/profile',
      name: 'profile',
      meta: { requiresAuth: true },
      component: () => import('../views/Participante/ProfileView.vue'),
    },
    {
      path: '/participante/:id/events',
      name: 'events',
      meta: { requiresAuth: true },
      component: () => import('../views/Participante/EventsView.vue'),
    },
    {
      path: '/participante/:id/communication',
      name: 'communication',
      meta: { requiresAuth: true },
      component: () => import('../views/Participante/CommunicationView.vue'),
    },
    {
      path: '/participante/:id/merchandising',
      name: 'merchandising',
      meta: { requiresAuth: true },
      component: () => import('../views/Participante/MerchandisingView.vue'),
    },
    {
      path: '/participante/:id/volunteering',
      name: 'volunteering',
      meta: { requiresAuth: true },
      component: () => import('../views/Participante/VolunteeringView.vue'),
    },
    //404 Page
    {
      path: '/:pathMatch(.*)*',
      name: '404Page',
      component: () => import('../views/NotFound.Vue'),
    },
  ],
})

export default router
