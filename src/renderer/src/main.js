import './assets/css/main.css'
// import './assets/base.css'
import 'tdesign-vue-next/es/style/index.css'
// import global design variables / 引入组件库的少量全局样式变量

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
// Import Pinia for state management / 引入 Pinia
import TDesign from 'tdesign-vue-next'
// Import TDesign component library / 引入 TDesign 组件库
import router from '@/router'
// Import router / 引入图路由

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(TDesign)
app.mount('#app')
