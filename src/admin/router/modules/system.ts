export default [{
    name: 'home',
    path: '/',
    meta: {
        title: '首页'
    },
    component: () => import('@C/frame/frame.vue'),
    redirect: '/Welcome',
    children: [
        {
            name: 'Welcome',
            path: '/Welcome',
            meta: {
                title: '欢迎页'
            },
            component: () => import('@admin/pages/system/Welcome.vue')
        },
        {
            name: 'Menu',
            path: '/Menu',
            meta: {
                title: '欢迎页'
            },
            component: () => import('@admin/pages/system/Menu.vue')
        }
    ]
}]