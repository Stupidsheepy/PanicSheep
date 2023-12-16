import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      components: {
        default: () => import('~/views/Home.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue'),
        viploginnav: () => import('~/views/VipLoginNav.vue')
      },
      meta: {
        title: 'Home Page',
      },
    },
    {
      path: '/explore',
      name: 'explore',
      components: {
        default: () => import('~/views/Explore.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue'),
        viploginnav: () => import('~/views/VipLoginNav.vue')
      },
      meta: {
        title: 'Explore Page',
      },
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: () => import('~/views/Profile.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue'),
        viploginnav: () => import('~/views/VipLoginNav.vue')
      },
      meta: {
        title: 'Profile Page',
      },
    },
    {
      path: '/notifications',
      name: 'notifications',
      components: {
        default: () => import('~/views/Notifications.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue'),
        viploginnav: () => import('~/views/VipLoginNav.vue')
      },
      meta: {
        title: 'Notifications Page',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      components: {
        default: () => import('~/views/Settings.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue'),
        viploginnav: () => import('~/views/VipLoginNav.vue')
      },
      meta: {
        title: 'Settings Page',
      },
    },
    {
      //TODO /user/:username/tweet/:id
      path: '/user/:username/tweet/:tweetId',
      name: 'tweet',
      components: {
        default: () => import('~/views/Tweet.vue'),
        loginnav: () => import('~/views/LoginNav.vue'),
        logoutnav: () => import('~/views/LogoutNav.vue'),
        viploginnav: () => import('~/views/VipLoginNav.vue')
      },
    },
    // {
    //   path: "/login",
    //   name: "Login",
    //   components: {
    //     default: () => import('~/views/LogoutNav.vue'),
    //     loginnav: () => import('~/views/LoginNav.vue'),
    //     logoutnav: () => import('~/views/LogoutNav.vue'),
    //     viploginnav: () => import('~/views/VipLoginNav.vue')
    //   },
    //   meta: {
    //     title: "Login Page"
    //   }
    // },
  ],
})

export default router