import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@Admin/components/frame/index.vue'
// 主页
// import systemModules from './modules/system'

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: Home,
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: '/welcome',
                meta: {
                    title: '欢迎来到Zbxiang后台管理系统'
                },
                component: () => import('@Admin/pages/Welcome.vue')
            },
            {
                name: 'role',
                path: '/role',
                meta: {
                    title: '角色列表'
                },
                component: () => import('@Admin/pages/Role.vue')
            }
        ]
    },
    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('@Admin/pages/Login.vue')
    },
    // ...systemModules
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

async function loadAsyncRoutes() {
    console.log('sdlgjdskjgksdjgkjdskjgjsdg')
}

await loadAsyncRoutes()

export default router