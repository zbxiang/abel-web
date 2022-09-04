import { createRouter, createWebHashHistory } from 'vue-router'
import $storage from './../utils/storage'
import $api from './../api'
import utils from './../utils/utils'
const modules = import.meta.glob('./../pages/**/**.vue')

const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: () => import('@Admin/components/layout.vue'),
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
                name: 'user',
                path: '/user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('@Admin/pages/User.vue')
            },
            {
                name: 'menu',
                path: '/menu',
                meta: {
                    title: '菜单管理'
                },
                component: () => import('@Admin/pages/Menu.vue')
            },
            {
                name: 'role',
                path: '/role',
                meta: {
                    title: '角色管理'
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
    {
        name: '404',
        path: '/404',
        meta: {
            title: '页面不存在'
        },
        component: () => import('@Admin/pages/404.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

async function loadAsyncRoutes() {
    let userInfo = $storage.getItem('userInfo') || {}
    if (userInfo.token) {
        try {
            const res = await $api.getPermissionList()
            if (res.code == 200) {
                let menuList = res.data.menuList
                let routes = utils.generateRoute(menuList)
                routes.map(route => {
                    route.component = modules[`./../pages/${route.component}.vue`]
                    router.addRoute("home", route)
                })
            }
        } catch (error) {

        }
    }
}

await loadAsyncRoutes()

// 导航守卫
router.beforeEach((to: any, from: any, next) => {
    if (router.hasRoute(to.name)) {
        document.title = to.meta.title
        next()
    } else {
        next('/404')
    }
})

export default router