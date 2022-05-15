import { createRouter, createWebHashHistory } from 'vue-router'
// 主页
import HomeModules from './modules/home'

const routes = [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@admin/components/Login.vue')
    },
    ...HomeModules
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router