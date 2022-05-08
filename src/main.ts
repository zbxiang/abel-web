import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import config from './config'

console.log("环境变量=>", import.meta.env)
console.log(config.baseApi)
const app = createApp(App)

app.use(router).use(ElementPlus).mount('#app')
