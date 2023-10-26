import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('~/views/Home.vue'),
      meta: {
        title: 'Home Page',
      },
    },
    {
      path: '/explore',
      name: 'Explore',
      component: () => import('~/views/Explore.vue'),
      meta: {
        title: 'Explore Page',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('~/views/Profile.vue'),
      meta: {
        title: 'Profile Page',
      },
    },
    {
      path: '/notifications',
      name: 'Notifications',
      component: () => import('~/views/Notifications.vue'),
      meta: {
        title: 'Notifications Page',
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('~/views/Settings.vue'),
      meta: {
        title: 'Settings Page',
      },
    },
  ],
})

export default router
