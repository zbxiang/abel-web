import { createRouter, createWebHashHistory } from 'vue-router'
// 主页
import HomeModules from './modules/home'

const routes = [
    ...HomeModules
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router