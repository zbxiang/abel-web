import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import http from './utils/http'

console.log("环境变量=>", import.meta.env)
const app = createApp(App)
app.config.globalProperties.$http = http
app.use(router).use(ElementPlus).mount('#app')
