import { createApp } from 'vue'
import App from './App.vue'
import router from '@admin/router'
import store from '@C/store'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import http from '@C/utils/http'
import storage from '@C/utils/storage'
import services from '@C/services'
import mitt from 'mitt'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const emitter = mitt();

console.log("环境变量=>", import.meta.env)
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
app.config.globalProperties.$http = http
app.config.globalProperties.$services = services
app.config.globalProperties.$storage = storage
app.config.globalProperties.$emitter = emitter
app.use(router).use(store).use(ElementPlus, { size: 'small' }).mount('#app')








