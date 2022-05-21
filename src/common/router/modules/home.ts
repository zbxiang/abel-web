import frame from '@/common/frame/frame.vue'
import Welcome from '@/web/pages/home/welcome.vue'

export default [{
    name: 'home',
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
            component: Welcome
        }
    ]
}]