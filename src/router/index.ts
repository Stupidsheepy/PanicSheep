import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: () => import('~/views/Home.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue')
      },
      meta: {
        title: 'Home Page',
      },
    },
    {
      path: '/explore',
      name: 'Explore',
      components: {
        default: () => import('~/views/Explore.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue')
      },
      meta: {
        title: 'Explore Page',
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      components: {
        default: () => import('~/views/Profile.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue')
      },
      meta: {
        title: 'Profile Page',
      },
    },
    {
      path: '/notifications',
      name: 'Notifications',
      components: {
        default: () => import('~/views/Notifications.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue')
      },
      meta: {
        title: 'Notifications Page',
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      components: {
        default: () => import('~/views/Settings.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue')
      },
      meta: {
        title: 'Settings Page',
      },
    },
    // {
    //   path: "/login",
    //   name: "Login",
    //   components: {
    //     default: () => import('~/views/LogoutNav.vue'),
    //     loginnav: () => import('~/views/LoginNav.vue'),
    //     logoutnav: () => import('~/views/LogoutNav.vue')
    //   },
    //   meta: {
    //     title: "Login Page"
    //   }
    // },
  ],
})

export default router