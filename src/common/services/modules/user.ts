import http from '@C/utils/http'

/**
 * 用户登录
 */
export default {
    login(params: Object) {
        return http({
            url: '/v1/user/login',
            method: 'post',
            data: params,
            mock: false
        })
    },
    noticeCount(params: Object) {
        return http({
            url: '/leave/count',
            method: 'get',
            data: {},
            mock: false
        })
    },
    getMenuList(params: Object) {
        return http({
            url: '/menu/List',
            method: 'get',
            data: {},
            mock: false
        })
    }
}