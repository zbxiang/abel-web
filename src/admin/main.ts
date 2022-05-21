import { createApp } from 'vue'
import App from './App.vue'
import router from '@admin/router'
import store from '@C/store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import http from '@C/utils/http'
import storage from '@C/utils/storage'
import services from '@C/services'

console.log("环境变量=>", import.meta.env)
const app = createApp(App)
app.config.globalProperties.$http = http
app.config.globalProperties.$services = services
app.config.globalProperties.$storage = storage
app.use(router).use(store).use(ElementPlus).mount('#app')
