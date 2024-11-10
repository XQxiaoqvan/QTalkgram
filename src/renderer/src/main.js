import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'

import '@/assets/base.css'

import router from '@/router'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(TDesign)
app.mount('#app')
