import frame from '@C/frame/frame.vue'

export default [{
    name: 'system',
    path: '/',
    meta: {
        title: '首页'
    },
    component: frame,
    redirect: '/welcome',
    children: [
        {
            name: 'welcome',
            path: '/welcome',
            meta: {
                title: '欢迎页'
            },
            component: () => import('@admin/pages/system/Welcome.vue')
        }
    ]
}]