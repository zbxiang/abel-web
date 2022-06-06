import { createRouter, createWebHashHistory } from 'vue-router'
// 主页
import systemModules from './modules/system'

const routes = [
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@admin/pages/login.vue')
    },
    ...systemModules
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router