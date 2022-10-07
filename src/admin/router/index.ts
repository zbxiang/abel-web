import { createRouter, createWebHashHistory } from 'vue-router'
import { Layout, mapTwoLevelRouter } from '../layout'
import $storage from './../utils/storage'
import $api from './../api'
import { generateRoute } from '../utils'
const modules = import.meta.glob('./../pages/**/**.vue')

// const routes = [
//     {
//         name: 'home',
//         path: '/',
//         meta: {
//             title: '首页'
//         },
//         component: () => import('@Admin/layout/index.vue'),
//         redirect: '/welcome',
//         children: [
//             {
//                 name: 'welcome',
//                 path: '/welcome',
//                 meta: {
//                     title: '欢迎来到Zbxiang后台管理系统'
//                 },
//                 component: () => import('@Admin/pages/Welcome.vue')
//             },
//             {
//                 name: 'user',
//                 path: '/user',
//                 meta: {
//                     title: '用户管理'
//                 },
//                 component: () => import('@Admin/pages/User.vue')
//             },
//             {
//                 name: 'menu',
//                 path: '/menu',
//                 meta: {
//                     title: '菜单管理'
//                 },
//                 component: () => import('@Admin/pages/Menu.vue')
//             },
//             {
//                 name: 'role',
//                 path: '/role',
//                 meta: {
//                     title: '角色管理'
//                 },
//                 component: () => import('@Admin/pages/Role.vue')
//             }
//         ]
//     },
//     {
//         name: 'login',
//         path: '/login',
//         hidden: true,
//         meta: {
//             title: '登录'
//         },
//         component: () => import('@Admin/pages/Login.vue')
//     },
//     {
//         name: '404',
//         path: '/404',
//         hidden: true,
//         meta: {
//             title: '页面不存在'
//         },
//         component: () => import('@Admin/pages/404.vue')
//     }
// ]

export const constantRoutes = [
    {
        path: '/redirect',
        // component: () => import('@Admin/layout/index.vue'),
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)*',
                component: (): any => import('@Admin/pages/redirect/index.vue')
            }
        ],
    },
    {
        name: '404',
        path: '/404',
        hidden: true,
        meta: {
            title: '页面不存在'
        },
        component: (): any => import('@Admin/pages/exception/404.vue')
    },
    {
        name: 'login',
        path: '/login',
        hidden: true,
        meta: {
            title: '登录'
        },
        component: (): any => import('@Admin/pages/login/index.vue')
    },
    {
        path: '/personal',
        // component: (): any => import('@Admin/layout/index.vue'),
        component: Layout,
        hidden: true,
        children: [
          {
            path: '',
            name: 'Personal',
            component: (): any => import('@Admin/pages/personal/index.vue'),
            meta: {
              title: '个人中心',
            },
          },
        ],
    },
    {
        path: '/',
        redirect: '/index/home',
        hidden: true
    }
]

export const asyncRoutes = [
    {
        path: '/index',
        name: 'root',
        // component: (): any => import('@Admin/layout/index.vue'),
        component: Layout,
        meta: {
            title: 'Dashboard',
            icon: 'HouseIcon'
        },
        children: [
            {
                path: 'home',
                name: 'Home',
                component: (): any => import('@Admin/pages/index/main.vue'),
                meta: {
                    title: '主控台',
                    affix: true,
                    cacheable: true
                },
            },
            {
                path: 'work-place',
                name: 'WorkPlace',
                component: (): any => import('@Admin/pages/index/work-place.vue'),
                meta: {
                    title: '工作台',
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'system',
        // component: (): any => import('@Admin/layout/index.vue'),
        component: Layout,
        meta: {
            title: '系统管理',
            icon: 'SettingIcon'
        },
        children: [
            {
                path: 'menu',
                name: 'Menu',
                component: (): any => import('@Admin/pages/system/menu.vue'),
                meta: {
                    title: '菜单管理',
                }
            },
            {
                path: 'user',
                name: 'User',
                component: (): any => import('@Admin/pages/system/user.vue'),
                meta: {
                    title: '用户管理',
                }
            },
            {
                path: 'dept',
                name: 'Dept',
                component: (): any => import('@Admin/pages/system/department.vue'),
                meta: {
                    title: '部门管理',
                }
            },
            {
                path: 'role',
                name: 'Role',
                component: (): any => import('@Admin/pages/system/role.vue'),
                meta: {
                    title: '角色管理',
                }
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: mapTwoLevelRouter([...constantRoutes, ...asyncRoutes])
})

// async function loadAsyncRoutes() {
//     let userInfo = $storage.getItem('userInfo') || {}
//     if (userInfo.token) {
//         try {
//             const res = await $api.getPermissionList()
//             if (res.code == 200) {
//                 let menuList = res.data.menuList
//                 let routes = generateRoute(menuList)
//                 routes.map(route => {
//                     route.component = modules[`./../pages/${route.component}.vue`]
//                     router.addRoute('home', route)
//                 })
//             }
//         } catch (error) {

//         }
//     }
// }

// await loadAsyncRoutes()

// 导航守卫
// router.beforeEach((to: any, from: any, next) => {
//     if (router.hasRoute(to.name)) {
//         document.title = to.meta.title
//         next()
//     } else {
//         next('/404')
//     }
// })

export default router