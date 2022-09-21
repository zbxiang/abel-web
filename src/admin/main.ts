import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './utils/router'
// import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@Admin/assets/icons/iconfont/iconfont.css'
import '@Admin/assets/icons/iconfont/iconfont.js'
import '@Admin/assets/styles/main.css'
import LayoutStore from "./layout"
import http from './utils/http'
import { registerComponents } from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './store/pinia'
import api from './api'
import storage from './utils/storage'

import './setting'

// console.log("环境变量=>", import.meta.env)

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

registerComponents(app)

app.use(LayoutStore, {
    state: {
        layoutMode: 'ltr'
    },
    actions: {
        onPersonalCenter() {
            router.push({ path: '/personal', query: { uid: 1 } })
        },
        onLogout() {
            router.replace({ path: '/login', query: { redirect: '/' } }).then(() => {
                window.location.reload()
            })
        }
    }
})

app.config.globalProperties.$http = http
app.config.globalProperties.$api = api
app.config.globalProperties.$storage = storage
app.use(router).use(pinia).use(ElementPlus, { size: 'small', locale: zhCn, }).mount('#app')
// app.use(router).use(store).mount('#app')







