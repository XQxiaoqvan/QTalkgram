import { createRouter, createWebHashHistory } from 'vue-router'

const routes = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: () => import('@/views/load/index.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login/index.vue'),
      children: [
        {
          path: 'phone',
          name: 'Phone',
          component: () => import('@/views/Login/Login.vue')
        },
        {
          path: 'code',
          name: 'Code',
          component: () => import('@/views/Login/Logincode.vue')
        },
        {
          path: 'password',
          name: 'Password',
          component: () => import('@/views/Login/Login2FA.vue')
        },
        {
          path: 'QRlogin',
          name: 'QRlogin',
          component: () => import('@/views/Login/QRlogin.vue')
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      redirect: '/home/chats',
      component: () => import('@/views/Home/index.vue'),
      children: [
        {
          path: 'chats',
          name: 'Chats',
          component: () => import('@/views/Home/Chats.vue')
        },
        {
          path: 'contacts',
          name: 'Contacts',
          component: () => import('@/views/Home/Contacts.vue')
        },
        {
          path: 'archive',
          name: 'archive',
          component: () => import('@/views/Home/Archive.vue')
        }
      ]
    }
  ]
})

export default routes
