import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'default',
      redirect: '/QRlogin'
    },
    {
      path: '/QRlogin',
      name: 'QRlogin',
      component: () => import('@/views/QRLogin.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/login/code',
      name: 'code',
      component: () => import('@/views/LoginCode.vue')
    },
    {
      path: '/login/2fa',
      name: 'Login2FA',
      component: () => import('@/views/Login2FA.vue'),
      props: true
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      redirect: '/home/chats', // 添加这一行
      children: [
        {
          path: 'chats',
          name: 'chats',
          component: () => import('@/views/Home/Chats/index.vue')
        }
      ]
    }
  ]
})

export default router
