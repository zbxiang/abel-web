import http from '@C/utils/http'

/**
 * 用户登录
 */
export default {
    login(params: Object) {
        http({
            url: '/users/login',
            methods: 'post',
            data: params,
            mock: false
        })
    }
}