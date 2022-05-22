import http from '@C/utils/http'

/**
 * 用户登录
 */
export default {
    login(params: Object) {
        return http({
            url: '/users/login',
            method: 'post',
            data: params,
            mock: false
        })
    }
}