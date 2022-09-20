import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './utils/router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import http from './utils/http'
import api from './api'
import storage from './utils/storage'
import LayoutStore from "./layout"
import pinia from './store/pinia'
import { registerComponents } from './components'
import mitt from 'mitt'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const emitter = mitt();

// console.log("环境变量=>", import.meta.env)

const app = createApp(App)

app.directive('has', {
    beforeMount: function (el, binding) {
        let actionList = storage.getItem('actionList')
        let value = binding.value
        let hasPermission = actionList.includes(value)
        if (!hasPermission) {
            el.style = 'display:none'
            setTimeout(() => {
                el.parentNode.removeChild(el)
            }, 0)
        }
    }
})

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
app.config.globalProperties.$emitter = emitter
app.use(router).use(store).use(pinia).use(ElementPlus, { size: 'small', locale: zhCn, }).mount('#app')
// app.use(router).use(store).mount('#app')







